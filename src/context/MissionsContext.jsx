import { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";
import { AuthContext } from "./AuthContext";
import useCollection from "../hooks/useCollection";
import useNetwork from "../hooks/useNetwork";
import { useLocalNotifications } from "../hooks/useLocalNotifications";


export const META_METROS = 50;
export const SEGUNDOS_QUIETO = 10;

export const MISSIONS = [
  {
    id: 1,
    title: "Evidencia",
    description: "Toma una foto con la cámara",
    points: 30,
  },
  {
    id: 2,
    title: "Movimiento real",
    description: `Muévete ${META_METROS} metros de tu posición original`,
    points: 40,
  },
  {
    id: 3,
    title: "Permanencia activa",
    description: `Quédate quieto ${SEGUNDOS_QUIETO} segundos`,
    points: 50,
    requires: 2, 
  },
];

export const MissionsContext = createContext();


const emptyMissions = () => MISSIONS.map((m) => ({ id: m.id, completed: false }));

const computePoints = (missions) =>
  MISSIONS.reduce(
    (sum, m) =>
      sum + (missions.find((x) => x.id === m.id)?.completed ? m.points : 0),
    0
  );


const buildState = (missions, owner) => ({
  owner,
  points: computePoints(missions),
  missions,
});


const mergeMissions = (a = [], b = []) =>
  MISSIONS.map((m) => ({
    id: m.id,
    completed: Boolean(
      a.find((x) => x.id === m.id)?.completed ||
        b.find((x) => x.id === m.id)?.completed
    ),
  }));

const randomId = () => Math.floor(Math.random() * 2147483647);


const readLocal = (uid) => {
  try {
    const raw = localStorage.getItem(`progress_${uid}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeLocal = (uid, data) => {
  try {
    localStorage.setItem(`progress_${uid}`, JSON.stringify(data));
  } catch {
    /* sin espacio o bloqueado: se ignora */
  }
};


const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD":
      return buildState(action.missions, action.owner);
    case "COMPLETE": {
      const already = state.missions.find((m) => m.id === action.id)?.completed;
      if (already) return state;
      return buildState(
        state.missions.map((m) => (m.id === action.id ? { ...m, completed: true } : m)),
        state.owner
      );
    }
    case "RESET":
      return buildState(emptyMissions(), state.owner);
    default:
      return state;
  }
};

export function MissionsProvider({ children }) {
  const { user } = useContext(AuthContext);
  const { isOnline } = useNetwork();
  const { getAll, add, update } = useCollection("progress");
  const { requestPermission, sendNotification } = useLocalNotifications();

  const uid = user?.uid ?? null;
  const [state, dispatch] = useReducer(reducer, null, () =>
    buildState(emptyMissions(), null)
  );
  const [hydrated, setHydrated] = useState(false); 
  const [remoteReady, setRemoteReady] = useState(false); 
  const [synced, setSynced] = useState(false);

  const stateRef = useRef(state);
  stateRef.current = state;
  const uidRef = useRef(uid);
  uidRef.current = uid;
  const docId = useRef(null); 
  const checkingRemote = useRef(false);
  const queue = useRef(Promise.resolve()); 
  const completing = useRef(new Set());

  
  useEffect(() => {
    docId.current = null;
    checkingRemote.current = false;
    completing.current.clear();
    setRemoteReady(false);
    setSynced(false);

    if (!uid) {
      dispatch({ type: "LOAD", missions: emptyMissions(), owner: null });
      setHydrated(false);
      return;
    }

    const local = readLocal(uid);
    dispatch({ type: "LOAD", missions: mergeMissions(local?.missions), owner: uid });
    setHydrated(true);
    requestPermission();
  }, [uid]);

  
  useEffect(() => {
    if (!uid || !hydrated || !isOnline || checkingRemote.current) return;
    checkingRemote.current = true;

    (async () => {
      const docs = await getAll([["uid", "==", uid]]);
      if (uidRef.current !== uid) return; // el usuario cambió mientras tanto

      if (docs.length > 0) {
        docId.current = docs[0].id;
        const merged = mergeMissions(readLocal(uid)?.missions, docs[0].missions);
        dispatch({ type: "LOAD", missions: merged, owner: uid });
      }
      setRemoteReady(true);
    })();
  }, [uid, hydrated, isOnline]);

  
  const sendPoints = async (snapshot) => {
    const data = {
      uid,
      name: user?.email?.split("@")[0] ?? "usuario",
      points: snapshot.points,
      missions: snapshot.missions,
    };

    if (docId.current) return update(docId.current, data);

    const ref = await add(data);
    if (ref) {
      docId.current = ref.id;
      return true;
    }
    return false;
  };

  
  useEffect(() => {
    if (!uid || !hydrated || state.owner !== uid) return;

    const snapshot = { points: state.points, missions: state.missions };
    writeLocal(uid, snapshot);

    if (!remoteReady || !isOnline) {
      setSynced(false); // queda pendiente hasta que vuelva la conexión
      return;
    }

    queue.current = queue.current
      .then(() => sendPoints(snapshot))
      .catch(() => false)
      .then((ok) => setSynced(Boolean(ok)));
  }, [state, remoteReady, isOnline, uid, hydrated]);

  
  const completeMission = async (id) => {
    const current = stateRef.current;
    const mission = current.missions.find((m) => m.id === id);
    if (!mission || mission.completed || completing.current.has(id)) return;
    completing.current.add(id);

    dispatch({ type: "COMPLETE", id });

    
    const remaining =
      MISSIONS.length - (current.missions.filter((m) => m.completed).length + 1);

    await sendNotification({
      id: randomId(),
      title: "Misiones",
      body: "Has completado una misión",
    });

    if (remaining === 1) {
      await sendNotification({
        id: randomId(),
        title: "Misiones",
        body: "Te falta 1 misión para completar",
      });
    }
  };

  const resetProgress = () => {
    completing.current.clear();
    dispatch({ type: "RESET" });
  };

  
  const total = MISSIONS.length;
  const completedCount = state.missions.filter((m) => m.completed).length;
  const percent = Math.round((completedCount / total) * 100);
  const status =
    completedCount === 0
      ? "Sin iniciar"
      : completedCount === total
      ? "Completado"
      : "En progreso";

  const isCompleted = (id) =>
    state.missions.find((m) => m.id === id)?.completed ?? false;

  const isUnlocked = (id) => {
    const requires = MISSIONS.find((m) => m.id === id)?.requires;
    return !requires || isCompleted(requires);
  };

  return (
    <MissionsContext.Provider
      value={{
        missions: state.missions,
        points: state.points,
        total,
        completedCount,
        percent,
        status,
        synced,
        isCompleted,
        isUnlocked,
        completeMission,
        resetProgress,
      }}
    >
      {children}
    </MissionsContext.Provider>
  );
}

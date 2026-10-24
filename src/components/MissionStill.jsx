import { useContext, useEffect, useRef, useState } from "react";
import { IonButton, IonProgressBar } from "@ionic/react";
import { MissionsContext, MISSIONS, SEGUNDOS_QUIETO } from "../context/MissionsContext";
import { useAccelerometer } from "../hooks/useAccelerometer";
import { useHaptics } from "../hooks/useHaptics";
import MissionCard from "./MissionCard";

const mission = MISSIONS.find((m) => m.id === 3);
const META_MS = SEGUNDOS_QUIETO * 1000;


const StillCounter = ({ onDone }) => {
  const { isMoving } = useAccelerometer();
  const { vibrate } = useHaptics();

  const [elapsed, setElapsed] = useState(0);
  const stillSince = useRef(Date.now());
  const movingRef = useRef(isMoving);
  movingRef.current = isMoving;
  const finished = useRef(false);

  
  useEffect(() => {
    const id = setInterval(() => {
      if (movingRef.current) stillSince.current = Date.now();
      setElapsed(Date.now() - stillSince.current);
    }, 100);
    return () => clearInterval(id);
  }, []);


  useEffect(() => {
    if (elapsed < META_MS || finished.current) return;
    finished.current = true;

    (async () => {
      await vibrate(1000);
      await onDone();
    })();
  }, [elapsed]);

  const remaining = Math.max(0, Math.ceil((META_MS - elapsed) / 1000));

  return (
    <>
      <p>
        {isMoving
          ? "Te estás moviendo: quédate quieto para continuar"
          : `Quieto... faltan ${remaining} s`}
      </p>
      <IonProgressBar value={Math.min(elapsed / META_MS, 1)} />
    </>
  );
};


const MissionStill = () => {
  const { isCompleted, isUnlocked, completeMission } = useContext(MissionsContext);
  const [active, setActive] = useState(false);

  const completed = isCompleted(mission.id);
  const locked = !isUnlocked(mission.id);

  const handleDone = async () => {
    setActive(false);
    await completeMission(mission.id);
  };

  return (
    <MissionCard mission={mission} completed={completed} locked={locked}>
      {!completed && !active && (
        <IonButton expand="block" disabled={locked} onClick={() => setActive(true)}>
          Iniciar misión
        </IonButton>
      )}

      {active && <StillCounter onDone={handleDone} />}
    </MissionCard>
  );
};

export default MissionStill;
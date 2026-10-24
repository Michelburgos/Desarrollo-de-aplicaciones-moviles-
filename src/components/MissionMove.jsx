import { useContext, useEffect, useRef, useState } from "react";
import { IonButton, IonProgressBar, IonText } from "@ionic/react";
import { MissionsContext, MISSIONS, META_METROS } from "../context/MissionsContext";
import { useGeolocation } from "../hooks/useGeolocation";
import MissionCard from "./MissionCard";

const mission = MISSIONS.find((m) => m.id === 2);

const distanceInMeters = (a, b) => {
  const R = 6371000; 
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.latitude)) *
      Math.cos(toRad(b.latitude)) *
      Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(h));
};


const MissionMove = () => {
  const { isCompleted, completeMission } = useContext(MissionsContext);
  const { position, error, startTracking, stopTracking } = useGeolocation();

  const [active, setActive] = useState(false);
  const [origin, setOrigin] = useState(null);
  const [distance, setDistance] = useState(0);

  const startPosition = useRef(null); 
  const stopRef = useRef(stopTracking);
  stopRef.current = stopTracking;

  const completed = isCompleted(mission.id);

  const handleStart = async () => {
    startPosition.current = position;
    setOrigin(null);
    setDistance(0);
    setActive(true);
    await startTracking();
  };

  
  useEffect(() => {
    if (!active || !position || position === startPosition.current) return;

    if (!origin) {
      setOrigin({ latitude: position.latitude, longitude: position.longitude });
      return;
    }

    const d = distanceInMeters(origin, position);
    setDistance(d);

    if (d >= META_METROS) {
      stopTracking();
      setActive(false);
      completeMission(mission.id);
    }
  }, [position, active]);

  
  useEffect(() => () => stopRef.current(), []);

  return (
    <MissionCard mission={mission} completed={completed}>
      <IonButton expand="block" disabled={completed || active} onClick={handleStart}>
        {active ? "Caminando..." : "Iniciar misión"}
      </IonButton>

      {(active || completed) && (
        <>
          <p>
            Distancia: {completed ? META_METROS : Math.round(distance)} m / {META_METROS} m
          </p>
          <IonProgressBar value={completed ? 1 : Math.min(distance / META_METROS, 1)} />
        </>
      )}

      {active && !origin && <p>Obteniendo tu ubicación inicial...</p>}

      {error && !completed && (
        <IonText color="danger">
          <p>{error.message || String(error)}</p>
        </IonText>
      )}
    </MissionCard>
  );
};

export default MissionMove;
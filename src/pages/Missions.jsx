import { useContext } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonContent,
  IonProgressBar,
} from "@ionic/react";
import { MissionsContext } from "../context/MissionsContext";
import LogoutButton from "../components/LogoutButton";
import MissionPhoto from "../components/MissionPhoto";
import MissionMove from "../components/MissionMove";
import MissionStill from "../components/MissionStill";

const Missions = () => {
  const { points, percent, completedCount, total, synced } =
    useContext(MissionsContext);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Misiones</IonTitle>
          <IonButtons slot="end">
            <LogoutButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Puntos: {points}</h2>

        <IonProgressBar value={percent / 100} />
        <p>
          {percent}% completado · {completedCount}/{total} misiones
        </p>

        <p>{synced ? "Guardado en Firebase" : "Pendiente de sincronizar"}</p>

        <MissionPhoto />
        <MissionMove />
        <MissionStill />
      </IonContent>
    </IonPage>
  );
};

export default Missions;
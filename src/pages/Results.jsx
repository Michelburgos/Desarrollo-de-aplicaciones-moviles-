import { useContext } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonContent,
  IonList, IonItem, IonLabel, IonButton,
} from "@ionic/react";
import { MissionsContext, MISSIONS } from "../context/MissionsContext";
import LogoutButton from "../components/LogoutButton";

const Results = () => {
  const { points, completedCount, total, status, isCompleted, resetProgress } =
    useContext(MissionsContext);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Resultados</IonTitle>
          <IonButtons slot="end">
            <LogoutButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel>Puntos totales</IonLabel>
            <strong slot="end">{points}</strong>
          </IonItem>
          <IonItem>
            <IonLabel>Misiones completadas</IonLabel>
            <strong slot="end">
              {completedCount} de {total}
            </strong>
          </IonItem>
          <IonItem>
            <IonLabel>Estado general</IonLabel>
            <strong slot="end">{status}</strong>
          </IonItem>
        </IonList>

        <IonList className="ion-margin-top">
          {MISSIONS.map((m) => (
            <IonItem key={m.id}>
              <IonLabel>
                {m.id}. {m.title}
              </IonLabel>
              <span slot="end">
                {isCompleted(m.id) ? `+${m.points} pts` : "Pendiente"}
              </span>
            </IonItem>
          ))}
        </IonList>

        <IonButton
          expand="block"
          color="medium"
          className="ion-margin-top"
          onClick={resetProgress}
        >
          Reiniciar misiones
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Results;
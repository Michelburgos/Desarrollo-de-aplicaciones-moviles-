import {
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
} from "@ionic/react";

// Tarjeta común de una misión: título, puntos, estado (pendiente / completada)
const MissionCard = ({ mission, completed, locked = false, children }) => (
  <IonCard>
    <IonCardHeader>
      <IonCardTitle>
        {mission.id}. {mission.title}
      </IonCardTitle>
      <IonCardSubtitle>{mission.description}</IonCardSubtitle>
    </IonCardHeader>

    <IonCardContent>
      <p>
        {mission.points} pts · {completed ? "Completada" : "Pendiente"}
      </p>

      {locked && !completed && (
        <p>Se desbloquea al completar la misión {mission.requires}.</p>
      )}

      {children}
    </IonCardContent>
  </IonCard>
);

export default MissionCard;
import { IonButton } from '@ionic/react';

const Delete = ({ task, onDelete }) => {
  return (
    <IonButton onClick={() => onDelete(task.id)}>
      Eliminar
    </IonButton>
  );
};

export default Delete;
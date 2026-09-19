import { IonButton } from '@ionic/react';

const Complete = ({ task, onToggle }) => {
  return (
    <IonButton onClick={() => onToggle(task.id)}>
      ✓
    </IonButton>
  );
};

export default Complete;
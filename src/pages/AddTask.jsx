import { useState } from 'react';
import { IonItem, IonInput, IonButton } from '@ionic/react';

const Add = ({ onAddTask }) => {
  const [title, setTitle] = useState('');

  const handleClick = () => {
    if (title !== '') {
      onAddTask(title);
      setTitle('');
    }
  };

  return (
    <IonItem>
      <IonInput
        value={title}
        placeholder="Nueva tarea"
        onIonInput={(e) => setTitle(e.detail.value)}
      />
      <IonButton onClick={handleClick}>Agregar</IonButton>
    </IonItem>
  );
};

export default Add;
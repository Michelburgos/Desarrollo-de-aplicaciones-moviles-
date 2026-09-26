import { useState, useContext, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton
} from '@ionic/react';
import { useNavigate, useParams } from 'react-router-dom';
import { TasksContext } from '../context/TasksContext';

const Add = () => {
  const [title, setTitle] = useState('');
  const { addTask, updateTask, getTask } = useContext(TasksContext);
  const navigate = useNavigate();
  const { id } = useParams();

  
  useEffect(() => {
    if (id) {
      const task = getTask(id);
      if (task) setTitle(task.title);
    }
  }, [id]);

  const handleClick = () => {
    if (title !== '') {
      if (id) {
        updateTask(id, title);
      } else {
        addTask(title);
      }
      setTitle('');
      navigate('/home');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{id ? 'Editar tarea' : 'Nueva tarea'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            value={title}
            placeholder="Nueva tarea"
            onIonInput={(e) => setTitle(e.detail.value)}
          />
          <IonButton onClick={handleClick}>
            {id ? 'Guardar' : 'Agregar'}
          </IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Add;
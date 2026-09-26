import { useContext } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/react';
import { useNavigate, useParams } from 'react-router-dom';
import { TasksContext } from '../context/TasksContext';

const TaskDetail = () => {
  const { id } = useParams();
  const { getTask, toggleTask, deleteTask } = useContext(TasksContext);
  const navigate = useNavigate();
  const task = getTask(id);

  const handleDelete = () => {
    deleteTask(task.id);
    navigate('/home');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalle de tarea</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {!task ? (
          <>
            <p>Tarea no encontrada</p>
            <IonButton onClick={() => navigate('/home')}>Volver</IonButton>
          </>
        ) : (
          <>
            <h2>{task.title}</h2>
            <p>Estado: {task.completed ? 'Completada' : 'Pendiente'}</p>

            <IonButton onClick={() => toggleTask(task.id)}>
              {task.completed ? 'Marcar pendiente' : 'Marcar completada'}
            </IonButton>
            <IonButton onClick={() => navigate(`/edit-task/${task.id}`)}>
              Editar
            </IonButton>
            <IonButton color="danger" onClick={handleDelete}>
              Eliminar
            </IonButton>
            <IonButton fill="clear" onClick={() => navigate('/home')}>
              Volver
            </IonButton>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default TaskDetail;
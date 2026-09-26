import { useContext } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import { TasksContext } from '../context/TasksContext';
import { AuthContext } from '../context/AuthContext';
import Complete from './CompleteTask';
import Delete from './Delete';

const Home = () => {
  const { tasks, toggleTask, deleteTask } = useContext(TasksContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Task Manager</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>Cerrar sesión</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={() => navigate('/add-task')}>
          Nueva tarea
        </IonButton>

        <IonList>
          {tasks.map((task) => (
            <IonItem key={task.id}>
              <IonLabel onClick={() => navigate(`/task/${task.id}`)}>
                {task.title} {task.completed ? '(Completada)' : ''}
              </IonLabel>
              <Complete task={task} onToggle={toggleTask} />
              <Delete task={task} onDelete={deleteTask} />
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;

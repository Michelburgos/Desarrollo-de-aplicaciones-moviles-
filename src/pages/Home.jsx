import { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonButton,
  IonButtons,
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import Add from '../components/AddTask';
import Complete from '../components/CompleteTask';
import Delete from '../components/Delete';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // Verificar si el usuario está logueado al entrar
  useEffect(() => {
    const logged = localStorage.getItem('logged');
    if (logged !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  // Cargar tareas guardadas al iniciar
  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  // Guardar tareas cada vez que cambian
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title) => {
    const newTask = { id: Date.now(), title: title, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('logged');
    navigate('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Task Manager</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>Logout</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <Add onAddTask={addTask} />

        <IonList>
          {tasks.map((task) => (
            <IonItem key={task.id}>
              {task.title} {task.completed ? '(Completada)' : ''}
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

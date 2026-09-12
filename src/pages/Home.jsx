import { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
} from '@ionic/react';
import Add from '../components/AddTask';
import Complete from '../components/CompleteTask';
import Delete from '../components/Delete';

const Home = () => {
  const [tasks, setTasks] = useState([]);

  // Cargar tareas guardadas al iniciar (se ejecuta solo una vez, con [])
  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  // Guardar tareas cada vez que cambian (se ejecuta cuando cambia "tasks")
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Task Manager</IonTitle>
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

import { Navigate, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AuthProvider } from './context/AuthContext';
import { TasksProvider } from './context/TasksContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddTask from './pages/AddTask';
import TaskDetail from './pages/TaskDetail';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Ionic Dark Mode */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App = () => (
  <IonApp>
    <AuthProvider>
      <TasksProvider>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/home" element={<Home />} />
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/edit-task/:id" element={<AddTask />} />
            <Route path="/task/:id" element={<TaskDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
          </IonRouterOutlet>
        </IonReactRouter>
      </TasksProvider>
    </AuthProvider>
  </IonApp>
);

export default App;

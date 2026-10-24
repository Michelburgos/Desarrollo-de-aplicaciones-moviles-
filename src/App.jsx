import { useContext } from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import {
  IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton,
  IonIcon, IonLabel, setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { peopleOutline, checkboxOutline, nutritionOutline } from "ionicons/icons";

import { AuthProvider, AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contacts from "./pages/Contacts";
import Tasks from "./pages/Tasks";
import Frutas from "./pages/Frutas";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./theme/variables.css";

setupIonicReact();

const AppTabs = () => {
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation();

  
  const showTabBar =
    !!user && pathname !== "/login" && pathname !== "/register";

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
        <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
        <Route path="/fruits" element={<ProtectedRoute><Frutas /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/contacts" replace />} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom" style={{ display: showTabBar ? "flex" : "none" }}>
        <IonTabButton tab="contacts" href="/contacts">
          <IonIcon icon={peopleOutline} />
          <IonLabel>Contactos</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tasks" href="/tasks">
          <IonIcon icon={checkboxOutline} />
          <IonLabel>Tareas</IonLabel>
        </IonTabButton>
        <IonTabButton tab="fruits" href="/fruits">
          <IonIcon icon={nutritionOutline} />
          <IonLabel>Frutas</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

const App = () => (
  <IonApp>
    <AuthProvider>
      <IonReactRouter>
        <AppTabs />
      </IonReactRouter>
    </AuthProvider>
  </IonApp>
);

export default App;

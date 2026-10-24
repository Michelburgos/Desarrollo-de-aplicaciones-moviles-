import { useContext } from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import {
  IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton,
  IonIcon, IonLabel, setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { flagOutline, statsChartOutline, trophyOutline } from "ionicons/icons";

import { AuthProvider, AuthContext } from "./context/AuthContext";
import { MissionsProvider } from "./context/MissionsContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Missions from "./pages/Missions";
import Results from "./pages/Results";
import Ranking from "./pages/Ranking";

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

  // La barra de tabs solo se ve con sesión iniciada y fuera de login/register
  const showTabBar =
    !!user && pathname !== "/login" && pathname !== "/register";

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/missions" element={<ProtectedRoute><Missions /></ProtectedRoute>} />
        <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
        <Route path="/ranking" element={<ProtectedRoute><Ranking /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/missions" replace />} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom" style={{ display: showTabBar ? "flex" : "none" }}>
        <IonTabButton tab="missions" href="/missions">
          <IonIcon icon={flagOutline} />
          <IonLabel>Misiones</IonLabel>
        </IonTabButton>
        <IonTabButton tab="results" href="/results">
          <IonIcon icon={statsChartOutline} />
          <IonLabel>Resultados</IonLabel>
        </IonTabButton>
        <IonTabButton tab="ranking" href="/ranking">
          <IonIcon icon={trophyOutline} />
          <IonLabel>Ranking</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

const App = () => (
  <IonApp>
    <AuthProvider>
      <MissionsProvider>
        <IonReactRouter>
          <AppTabs />
        </IonReactRouter>
      </MissionsProvider>
    </AuthProvider>
  </IonApp>
);

export default App;

import { useContext } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
  IonContent, IonList, IonItem, IonLabel,
} from "@ionic/react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import NetworkBanner from "../components/NetworkBanner";

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inicio</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>Cerrar sesión</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <p>Hola, {user?.email}</p>
        <NetworkBanner />
        <IonList>
          <IonItem button onClick={() => navigate("/contacts")}>
            <IonLabel>Contactos (Firebase)</IonLabel>
          </IonItem>
          <IonItem button onClick={() => navigate("/tasks")}>
            <IonLabel>Tareas (Realtime)</IonLabel>
          </IonItem>
          <IonItem button onClick={() => navigate("/fruits")}>
            <IonLabel>Frutas (Dexie)</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
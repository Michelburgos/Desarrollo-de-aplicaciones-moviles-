import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
} from "@ionic/react";
import { useNavigate } from "react-router-dom";

// Un botón por cada sensor
const sensors = [
  { label: "Geolocation", path: "/geolocation" },
  { label: "Camera", path: "/camera" },
  { label: "Accelerometer", path: "/accelerometer" },
  { label: "Device", path: "/device" },
  { label: "Haptics", path: "/haptics" },
  { label: "Filesystem", path: "/filesystem" },
  { label: "Local Notifications", path: "/local-notifications" },
  { label: "Push Notifications", path: "/push-notifications" },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sensores</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {sensors.map((s) => (
          <IonButton
            key={s.path}
            expand="block"
            className="ion-margin-bottom"
            onClick={() => navigate(s.path)}
          >
            {s.label}
          </IonButton>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;

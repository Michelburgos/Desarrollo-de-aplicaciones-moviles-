import { IonButton } from "@ionic/react";
import PageLayout from "../components/PageLayout";
import { useLocalNotifications } from "../hooks/useLocalNotifications";

const LocalNotificationsPage = () => {
  const { permission, error, requestPermission, sendNotification, scheduleNotification } =
    useLocalNotifications();

  return (
    <PageLayout title="Local Notifications" error={error}>
      <p>Permiso: {permission ?? "desconocido"}</p>

      <IonButton expand="block" onClick={requestPermission}>
        Permisos
      </IonButton>

      <IonButton
        expand="block"
        onClick={() =>
          sendNotification({
            title: "Hola tu",
            body: "Notificación inmediata",
          })
        }
      >
        Enviar ahora
      </IonButton>

      <IonButton
        expand="block"
        onClick={() =>
          scheduleNotification({
            title: "Recordatorio",
            body: "En 5 segundos",
            seconds: 5,
          })
        }
      >
        Programar
      </IonButton>
    </PageLayout>
  );
};

export default LocalNotificationsPage;
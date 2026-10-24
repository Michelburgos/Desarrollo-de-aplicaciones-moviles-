import { IonButton } from "@ionic/react";
import PageLayout from "../components/PageLayout";
import { usePushNotifications } from "../hooks/usePushNotifications";

const PushNotificationsPage = () => {
  const { requestPermission, token, notification, error } =
    usePushNotifications();

  return (
    <PageLayout title="Push Notifications" error={error}>
      <IonButton onClick={requestPermission}>Activar Push</IonButton>

      <p style={{ wordBreak: "break-all" }}>Token: {token}</p>

      {notification && (
        <p>
          {notification.title} - {notification.body}
        </p>
      )}
    </PageLayout>
  );
};

export default PushNotificationsPage;
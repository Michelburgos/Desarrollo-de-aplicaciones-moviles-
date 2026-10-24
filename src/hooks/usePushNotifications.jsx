import { useEffect, useState } from "react";
import { PushNotifications } from "@capacitor/push-notifications";

export const usePushNotifications = () => {
  const [token, setToken] = useState(null);
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);

  const requestPermission = async () => {
    try {
      const result = await PushNotifications.requestPermissions();

      if (result.receive === "granted") {
        await PushNotifications.register();
      }
    } catch (err) {
      // En el navegador los push nativos no existen: solo funcionan en el celular
      setError(err);
    }
  };

  useEffect(() => {
    PushNotifications.addListener("registration", (token) => {
      console.log("Token:", token.value);
      setToken(token.value);
    });

    PushNotifications.addListener("registrationError", (err) => {
      setError(err);
    });

    PushNotifications.addListener(
      "pushNotificationReceived",
      (notification) => {
        console.log("Notificación:", notification);
        setNotification(notification);
      }
    );

    PushNotifications.addListener(
      "pushNotificationActionPerformed",
      (action) => {
        console.log("Click:", action);
      }
    );

    return () => {
      PushNotifications.removeAllListeners();
    };
  }, []);

  return {
    token, notification, error, requestPermission,
  };
};
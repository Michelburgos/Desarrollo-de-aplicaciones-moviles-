import { useEffect, useState } from "react";
import {
  LocalNotifications,
} from "@capacitor/local-notifications";


const newId = () => Math.floor(Date.now() % 2147483647);

export const useLocalNotifications = () => {
  const [permission, setPermission] = useState(null);
  const [error, setError] = useState(null);

  const requestPermission = async () => {
    try {
      const result = await LocalNotifications.requestPermissions();
      setPermission(result.display);
      return result.display === "granted";
    } catch (err) {
      setError(err);
    }
  };

  const checkPermission = async () => {
    try {
      const result = await LocalNotifications.checkPermissions();
      setPermission(result.display);
    } catch (err) {
      setError(err);
    }
  };

  const sendNotification = async ({
    id = newId(),
    title = "Notificación",
    body = "Mensaje",
  }) => {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id,
            title,
            body,
          },
        ],
      });
    } catch (err) {
      setError(err);
    }
  };

  const scheduleNotification = async ({
    id = newId(),
    title = "Recordatorio",
    body = "Tienes algo pendiente",
    seconds = 5,
  }) => {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id,
            title,
            body,
            schedule: {
              at: new Date(Date.now() + seconds * 1000),
            },
          },
        ],
      });
    } catch (err) {
      setError(err);
    }
  };

  const cancelNotification = async (id) => {
    try {
      await LocalNotifications.cancel({
        notifications: [{ id }],
      });
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    
    const listener = LocalNotifications.addListener(
      "localNotificationActionPerformed",
      (notification) => {
        console.log("Notificación tocada:", notification);
      }
    );

    return () => {
      listener.then((l) => l.remove());
    };
  }, []);

  useEffect(() => {
    checkPermission();
  }, []);

  return {
    permission, error,
    requestPermission, checkPermission,
    sendNotification, scheduleNotification,
    cancelNotification,
  };
};
import { IonItem, IonIcon, IonLabel, IonText } from "@ionic/react";
import { wifiOutline, cellularOutline, cloudOfflineOutline } from "ionicons/icons";
import useNetwork from "../hooks/useNetwork";

const NetworkBanner = () => {
  const { isOnline, connectionType } = useNetwork();

  const getIcon = () => {
    if (!isOnline) return cloudOfflineOutline;
    if (connectionType === "wifi") return wifiOutline;
    return cellularOutline;
  };

  return (
    <IonItem>
      <IonIcon icon={getIcon()} slot="start" />
      <IonLabel>
        <IonText color={isOnline ? "success" : "danger"}>
          <h2>{isOnline ? "Conectado" : "Sin conexión: acciones deshabilitadas"}</h2>
        </IonText>
        <p>Tipo: {connectionType ?? "desconocido"}</p>
      </IonLabel>
    </IonItem>
  );
};

export default NetworkBanner;
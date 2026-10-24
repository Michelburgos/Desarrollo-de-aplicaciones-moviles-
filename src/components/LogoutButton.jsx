import { useContext } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import { AuthContext } from "../context/AuthContext";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  return (
    <IonButton onClick={logout}>
      <IonIcon slot="icon-only" icon={logOutOutline} />
    </IonButton>
  );
};

export default LogoutButton;
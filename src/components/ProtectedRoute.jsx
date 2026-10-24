import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { IonPage, IonContent, IonSpinner } from "@ionic/react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <IonPage>
        <IonContent className="ion-padding ion-text-center">
          <IonSpinner />
        </IonContent>
      </IonPage>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}
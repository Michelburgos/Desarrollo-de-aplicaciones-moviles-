import { useState } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = async (e) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      history.push("/home");
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Error signing in: " + error.message);
    }
  };
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h1>Login</h1>
        <IonInput
          placeholder="Email"
          ionChange={(e) => setEmail(e.detail.value)}
        />
        <IonInput
          placeholder="Password"
          type="password"
          ionChange={(e) => setPassword(e.detail.value)}
        />
        <IonButton expand="block" onClick={handleLogin}>
          Login
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

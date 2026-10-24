import { useState, useContext } from "react";
import { IonPage, IonContent, IonInput, IonButton } from "@ionic/react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate("/contacts");
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h1>Login</h1>
        <IonInput
          placeholder="Email"
          type="email"
          value={email}
          onIonInput={(e) => setEmail(e.detail.value)}
        />
        <IonInput
          placeholder="Password"
          type="password"
          value={password}
          onIonInput={(e) => setPassword(e.detail.value)}
        />
        <IonButton expand="block" onClick={handleLogin}>
          Login
        </IonButton>
        <IonButton expand="block" fill="clear" onClick={() => navigate("/register")}>
          Crear cuenta
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Login;
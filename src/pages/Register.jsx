import { useState, useContext } from "react";
import { IonPage, IonContent, IonInput, IonButton } from "@ionic/react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const handleRegister = async () => {
    try {
      await register(email, password);
      navigate("/contacts");
    } catch (error) {
      alert("Error al registrarse: " + error.message);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h1>Register</h1>
        <IonInput
          placeholder="Email"
          type="email"
          value={email}
          onIonInput={(e) => setEmail(e.detail.value)}
        />
        <IonInput
          placeholder="Password (mín. 6 caracteres)"
          type="password"
          value={password}
          onIonInput={(e) => setPassword(e.detail.value)}
        />
        <IonButton expand="block" onClick={handleRegister}>
          Register
        </IonButton>
        <IonButton expand="block" fill="clear" onClick={() => navigate("/login")}>
          Ya tengo cuenta
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Register;
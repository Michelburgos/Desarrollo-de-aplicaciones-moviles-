import { useState, useContext } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton
} from "@ionic/react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        try {
            await login(email, password);
            navigate("/home");
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
                    onIonChange={(e) => setEmail(e.detail.value)}
                />
                <IonInput
                    placeholder="Password"
                    type="password"
                    onIonChange={(e) => setPassword(e.detail.value)}
                />
                <IonButton expand="block" onClick={handleLogin}>
                    Login
                </IonButton>
            </IonContent>
        </IonPage>
    );
}

export default Login;
import { useState, useContext } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton
} from "@ionic/react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { register } = useContext(AuthContext);

    const handleRegister = async (e) => {
        try {
            await register(email, password);
            navigate("/home");
        } catch (error) {
            console.error("Error signing up:", error);
            alert("Error signing up: " + error.message);
        }
    };

    return (
        <IonPage>
            <IonContent className="ion-padding">
                <h1>Register</h1>
                <IonInput
                    placeholder="Email"
                    onIonChange={(e) => setEmail(e.detail.value)}
                />
                <IonInput
                    placeholder="Password"
                    type="password"
                    onIonChange={(e) => setPassword(e.detail.value)}
                />
                <IonButton expand="block" onClick={handleRegister}>
                    Register
                </IonButton>
            </IonContent>
        </IonPage>
    );
}

export default Register;
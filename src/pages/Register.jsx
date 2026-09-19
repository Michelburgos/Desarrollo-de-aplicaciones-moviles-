import { useState } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleRegister = async (e) => {
        try {createUserWithEmailAndPassword(auth, email, password);
            history.push("/home");
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
                    ionChange={(e) => setEmail(e.detail.value)}
                />
                <IonInput
                    placeholder="Password"
                    type="password"
                    ionChange={(e) => setPassword(e.detail.value)}
                />
                <IonButton expand="block" onClick={handleRegister}>
                    Register
                </IonButton>
            </IonContent>
        </IonPage>
    );
}

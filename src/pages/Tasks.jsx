import { useState, useContext } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonContent, IonItem, IonLabel, IonInput, IonButton, IonList,
  IonSpinner, IonText, IonIcon,
} from "@ionic/react";
import { trashOutline, checkmarkOutline } from "ionicons/icons";
import { AuthContext } from "../context/AuthContext";
import useRealTimeCollection from "../hooks/useRealTimeCollection";
import useNetwork from "../hooks/useNetwork";
import NetworkBanner from "../components/NetworkBanner";

const Tasks = () => {
  const { user } = useContext(AuthContext);
  const { isOnline } = useNetwork();
  // No hace falta getAll: onValue refresca los resultados solo
  const { results, isPending, error, add, update, deleteDoc } =
    useRealTimeCollection(user ? `tasks/${user.uid}` : null);

  const [title, setTitle] = useState("");

  const handleAgregar = async () => {
    if (!title.trim()) return;
    await add({ title, completed: false });
    setTitle("");
  };

  const handleToggle = async (task) => {
    const { id, ...rest } = task; // update usa set(): se envía el registro completo
    await update(id, { ...rest, completed: !task.completed });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Tareas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <NetworkBanner />

        <IonItem>
          <IonLabel position="floating">Nueva tarea</IonLabel>
          <IonInput value={title} onIonInput={(e) => setTitle(e.detail.value)} />
        </IonItem>

        <IonButton
          expand="block"
          className="ion-margin-top"
          onClick={handleAgregar}
          disabled={isPending || !isOnline}
        >
          {isPending ? <IonSpinner name="crescent" /> : "Agregar"}
        </IonButton>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonList className="ion-margin-top">
          {results.map((t) => (
            <IonItem key={t.id}>
              <IonLabel style={{ textDecoration: t.completed ? "line-through" : "none" }}>
                {t.title}
              </IonLabel>
              <IonButtons slot="end">
                <IonButton disabled={!isOnline} onClick={() => handleToggle(t)}>
                  <IonIcon icon={checkmarkOutline} />
                </IonButton>
                <IonButton disabled={!isOnline} onClick={() => deleteDoc(t.id)}>
                  <IonIcon icon={trashOutline} />
                </IonButton>
              </IonButtons>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tasks;
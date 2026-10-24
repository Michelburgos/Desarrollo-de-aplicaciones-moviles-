import { useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonContent, IonItem, IonLabel, IonInput, IonButton, IonList,
  IonSpinner, IonText, IonIcon,
} from "@ionic/react";
import { trashOutline, createOutline } from "ionicons/icons";
import useDexie from "../hooks/useDexie";
import NetworkBanner from "../components/NetworkBanner";

const Frutas = () => {
  const [nombre, setNombre] = useState("");
  const [editando, setEditando] = useState(null);

  const { results, isPending, error, add, update, deleteItem, clearAll } =
    useDexie("frutas");

  const handleGuardar = async () => {
    if (!nombre.trim()) return;

    if (editando) {
      await update(editando, { nombre });
    } else {
      await add({ nombre });
    }

    setNombre("");
    setEditando(null);
  };

  const handleEditar = (fruta) => {
    setEditando(fruta.id);
    setNombre(fruta.nombre);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Frutas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <NetworkBanner />
        <p>Las frutas se guardan en el dispositivo (Dexie): funcionan sin conexión.</p>

        <IonItem>
          <IonLabel position="floating">Nombre de la fruta</IonLabel>
          <IonInput
            value={nombre}
            placeholder="Ej: Mango"
            onIonInput={(e) => setNombre(e.detail.value)}
          />
        </IonItem>

        <IonButton
          expand="block"
          className="ion-margin-top"
          onClick={handleGuardar}
          disabled={isPending}
        >
          {isPending ? <IonSpinner name="crescent" /> : editando ? "Guardar cambios" : "Agregar"}
        </IonButton>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonList className="ion-margin-top">
          {results.map((fruta) => (
            <IonItem key={fruta.id}>
              <IonLabel>{fruta.nombre}</IonLabel>
              <IonButtons slot="end">
                <IonButton onClick={() => handleEditar(fruta)}>
                  <IonIcon icon={createOutline} />
                </IonButton>
                <IonButton onClick={() => deleteItem(fruta.id)}>
                  <IonIcon icon={trashOutline} />
                </IonButton>
              </IonButtons>
            </IonItem>
          ))}
        </IonList>

        <IonButton color="medium" expand="block" onClick={clearAll}>
          Vaciar todas las frutas
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Frutas;
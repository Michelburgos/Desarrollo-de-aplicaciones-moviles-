import { useState, useContext, useEffect } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons,
  IonContent, IonItem, IonLabel, IonInput, IonButton, IonList,
  IonSpinner, IonText, IonIcon,
} from "@ionic/react";
import { trashOutline, createOutline } from "ionicons/icons";
import { AuthContext } from "../context/AuthContext";
import useCollection from "../hooks/useCollection";
import useNetwork from "../hooks/useNetwork";
import NetworkBanner from "../components/NetworkBanner";
import LogoutButton from "../components/LogoutButton";

const Contacts = () => {
  const { user } = useContext(AuthContext);
  const { isOnline } = useNetwork();
  const { results, isPending, error, getAll, add, update, remove } =
    useCollection("contactos");

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [editando, setEditando] = useState(null);


  const filters = [["uid", "==", user?.uid]];

  useEffect(() => {
    if (user && isOnline) getAll(filters);
  }, [user, isOnline]);

  const handleGuardar = async () => {
    if (!nombre.trim() || !telefono.trim()) return;

    if (editando) {
      await update(editando, { nombre, telefono });
    } else {
      await add({ nombre, telefono, uid: user.uid });
    }

    setNombre("");
    setTelefono("");
    setEditando(null);
    await getAll(filters);
  };

  const handleEditar = (c) => {
    setEditando(c.id);
    setNombre(c.nombre);
    setTelefono(c.telefono);
  };

  const handleEliminar = async (id) => {
    await remove(id);
    await getAll(filters);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contactos</IonTitle>
          <IonButtons slot="end">
            <LogoutButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <NetworkBanner />

        <IonItem>
          <IonLabel position="floating">Nombre</IonLabel>
          <IonInput value={nombre} onIonInput={(e) => setNombre(e.detail.value)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Teléfono</IonLabel>
          <IonInput value={telefono} onIonInput={(e) => setTelefono(e.detail.value)} />
        </IonItem>

        <IonButton
          expand="block"
          className="ion-margin-top"
          onClick={handleGuardar}
          disabled={isPending || !isOnline}
        >
          {isPending ? <IonSpinner name="crescent" /> : editando ? "Guardar cambios" : "Agregar"}
        </IonButton>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonList className="ion-margin-top">
          {results.map((c) => (
            <IonItem key={c.id}>
              <IonLabel>
                {c.nombre} - {c.telefono}
              </IonLabel>
              <IonButtons slot="end">
                <IonButton disabled={!isOnline} onClick={() => handleEditar(c)}>
                  <IonIcon icon={createOutline} />
                </IonButton>
                <IonButton disabled={!isOnline} onClick={() => handleEliminar(c.id)}>
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

export default Contacts;
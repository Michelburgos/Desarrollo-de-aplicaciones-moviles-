import { useContext, useEffect } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonContent,
  IonList, IonItem, IonLabel, IonButton, IonSpinner, IonText,
} from "@ionic/react";
import { AuthContext } from "../context/AuthContext";
import { MissionsContext } from "../context/MissionsContext";
import useCollection from "../hooks/useCollection";
import useNetwork from "../hooks/useNetwork";
import LogoutButton from "../components/LogoutButton";


const Ranking = () => {
  const { user } = useContext(AuthContext);
  const { points, synced } = useContext(MissionsContext);
  const { isOnline } = useNetwork();
  const { results, isPending, error, getAll } = useCollection("progress");

  
  useEffect(() => {
    if (user && isOnline) getAll([]);
  }, [user, isOnline, points, synced]);

  
  const me = {
    uid: user?.uid,
    name: user?.email?.split("@")[0] ?? "tú",
    points,
    isMe: true,
  };

  const others = results
    .filter((r) => r.uid !== user?.uid)
    .sort((a, b) => (b.points || 0) - (a.points || 0))
    .slice(0, 4);

  const ranking = [...others, me].sort((a, b) => (b.points || 0) - (a.points || 0));
  const position = ranking.findIndex((r) => r.isMe) + 1;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ranking</IonTitle>
          <IonButtons slot="end">
            <LogoutButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {!isOnline && (
          <IonText color="danger">
            <p>Sin conexión: el ranking de los demás usuarios no está disponible.</p>
          </IonText>
        )}

        <h2>
          Vas en el puesto {position} de {ranking.length}
        </h2>

        <IonList>
          {ranking.map((r, index) => (
            <IonItem key={r.uid ?? r.name} color={r.isMe ? "primary" : undefined}>
              <IonLabel>
                {index + 1}. {r.name} {r.isMe ? "(tú)" : ""}
              </IonLabel>
              <strong slot="end">{r.points || 0} pts</strong>
            </IonItem>
          ))}
        </IonList>

        {ranking.length < 5 && (
          <p>Aún hay pocos usuarios registrados: el ranking se completa cuando se unan más.</p>
        )}

        {isPending && <IonSpinner name="crescent" />}

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonButton
          expand="block"
          fill="outline"
          disabled={!isOnline}
          onClick={() => getAll([])}
        >
          Actualizar ranking
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Ranking;
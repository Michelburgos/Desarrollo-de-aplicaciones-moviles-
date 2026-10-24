import { IonButton } from "@ionic/react";
import PageLayout from "../components/PageLayout";
import { useHaptics } from "../hooks/useHaptics";

const HapticsPage = () => {
  const { isAvailable, impact, notify, vibrate } = useHaptics();

  return (
    <PageLayout title="Haptics">
      {!isAvailable && <p>Este dispositivo no tiene vibración disponible.</p>}

      <IonButton expand="block" onClick={() => impact("light")}>
        Impacto suave
      </IonButton>

      <IonButton expand="block" onClick={() => impact("heavy")}>
        Impacto fuerte
      </IonButton>

      <IonButton expand="block" onClick={() => notify("success")}>
        Éxito
      </IonButton>

      <IonButton expand="block" onClick={() => notify("error")}>
        Error
      </IonButton>

      <IonButton expand="block" onClick={() => vibrate(200)}>
        Vibrar
      </IonButton>
    </PageLayout>
  );
};

export default HapticsPage;
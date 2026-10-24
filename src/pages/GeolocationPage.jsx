import { IonButton } from "@ionic/react";
import PageLayout from "../components/PageLayout";
import { useGeolocation } from "../hooks/useGeolocation";

const GeolocationPage = () => {
  const { position, error, getCurrentLocation, startTracking, stopTracking } =
    useGeolocation();

  return (
    <PageLayout title="Geolocation" error={error}>
      <IonButton onClick={getCurrentLocation}>Ubicación actual</IonButton>
      <IonButton onClick={startTracking}>Iniciar</IonButton>
      <IonButton onClick={stopTracking}>Detener</IonButton>

      <p>Latitud: {position?.latitude}</p>
      <p>Longitud: {position?.longitude}</p>
    </PageLayout>
  );
};

export default GeolocationPage;
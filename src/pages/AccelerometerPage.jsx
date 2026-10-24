import { IonButton } from "@ionic/react";
import PageLayout from "../components/PageLayout";
import { useAccelerometer } from "../hooks/useAccelerometer";

const AccelerometerPage = () => {
  const { acceleration, magnitude, isShaking, isMoving, start, stop } =
    useAccelerometer({ threshold: 18 });

  return (
    <PageLayout title="Accelerometer">
      <IonButton onClick={start}>Iniciar</IonButton>
      <IonButton onClick={stop}>Detener</IonButton>

      <p>X: {acceleration.x.toFixed(2)}</p>
      <p>Y: {acceleration.y.toFixed(2)}</p>
      <p>Z: {acceleration.z.toFixed(2)}</p>

      <p>Movimiento: {isMoving ? "Sí" : "No"}</p>
      <p>Magnitud: {magnitude.toFixed(2)}</p>

      {isShaking && <h1>SHAKE DETECTADO</h1>}
    </PageLayout>
  );
};

export default AccelerometerPage;
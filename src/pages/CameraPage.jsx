import { IonButton } from "@ionic/react";
import PageLayout from "../components/PageLayout";
import { useCamera } from "../hooks/useCamera";

const CameraPage = () => {
  const { photo, error, takePhoto } = useCamera();

  return (
    <PageLayout title="Camera" error={error}>
      <IonButton onClick={takePhoto}>Tomar Foto</IonButton>

      {photo && <img src={photo} alt="Foto tomada" style={{ width: "100%" }} />}
    </PageLayout>
  );
};

export default CameraPage;
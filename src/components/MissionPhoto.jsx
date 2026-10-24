import { useContext } from "react";
import { IonButton, IonSpinner, IonText } from "@ionic/react";
import { Directory } from "@capacitor/filesystem";
import { AuthContext } from "../context/AuthContext";
import { MissionsContext, MISSIONS } from "../context/MissionsContext";
import { useCamera } from "../hooks/useCamera";
import { useFilesystem } from "../hooks/useFilesystem";
import MissionCard from "./MissionCard";

const mission = MISSIONS.find((m) => m.id === 1);


const MissionPhoto = () => {
  const { user } = useContext(AuthContext);
  const { isCompleted, completeMission } = useContext(MissionsContext);
  const { photo, error: cameraError, takePhoto } = useCamera();
  const { writeFile, loading, error: fileError } = useFilesystem();

  const completed = isCompleted(mission.id);

  const handleTakePhoto = async () => {
    const image = await takePhoto();
    if (!image) return; 

    const saved = await writeFile({
      path: `evidencia-${user.uid}-${Date.now()}.${image.format}`,
      data: image.base64String,
      directory: Directory.Data,
      isJson: false,
      binary: true,
    });

    if (saved) await completeMission(mission.id);
  };

  const error = cameraError || fileError;

  return (
    <MissionCard mission={mission} completed={completed}>
      <IonButton expand="block" disabled={completed || loading} onClick={handleTakePhoto}>
        {loading ? <IonSpinner name="crescent" /> : "Tomar foto"}
      </IonButton>

      {photo && (
        <img src={photo} alt="Evidencia" style={{ width: "100%", marginTop: 8 }} />
      )}

      {error && !completed && (
        <IonText color="danger">
          <p>{error.message || String(error)}</p>
        </IonText>
      )}
    </MissionCard>
  );
};

export default MissionPhoto;
import { useState } from "react";
import { Camera, CameraResultType } from "@capacitor/camera";

export const useCamera = () => {
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);

  const takePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
      });

      setPhoto(image.webPath);
    } catch (err) {
      setError(err);
    }
  };

  return { photo, error, takePhoto };
};
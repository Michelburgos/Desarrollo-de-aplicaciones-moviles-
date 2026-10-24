import { useState } from "react";
import { Camera, CameraResultType } from "@capacitor/camera";

export const useCamera = () => {
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);

  
  const takePhoto = async () => {
    try {
      setError(null);

      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Base64,
      });

      setPhoto(`data:image/${image.format};base64,${image.base64String}`);
      return image;
    } catch (err) {
      setError(err);
      return null;
    }
  };

  return { photo, error, takePhoto };
};
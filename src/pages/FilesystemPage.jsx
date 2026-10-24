import { useState } from "react";
import { IonButton, IonSpinner } from "@ionic/react";
import PageLayout from "../components/PageLayout";
import { useFilesystem } from "../hooks/useFilesystem";

const FilesystemPage = () => {
  const { writeFile, readFile, listFiles, deleteFile, loading, error } =
    useFilesystem();
  const [output, setOutput] = useState("");

  const onWriteFile = async () => {
    const ok = await writeFile({
      path: "mi-data.json",
      data: { nombre: "Jonathan", curso: "Ionic" },
    });
    setOutput(ok ? "Archivo guardado: mi-data.json" : "No se pudo guardar");
  };

  const onReadFile = async () => {
    const data = await readFile({ path: "mi-data.json" });
    console.log(data);
    setOutput(JSON.stringify(data, null, 2));
  };

  const onListFiles = async () => {
    const files = await listFiles({});
    console.log(files);
    setOutput(JSON.stringify(files.map((f) => f.name), null, 2));
  };

  const onDeleteFile = async () => {
    const ok = await deleteFile({ path: "mi-data.json" });
    setOutput(ok ? "Archivo eliminado" : "No se pudo eliminar");
  };

  return (
    <PageLayout title="Filesystem" error={error}>
      <IonButton expand="block" onClick={onWriteFile}>Escribir archivo</IonButton>
      <IonButton expand="block" onClick={onReadFile}>Leer archivo</IonButton>
      <IonButton expand="block" onClick={onListFiles}>Listar archivos</IonButton>
      <IonButton expand="block" onClick={onDeleteFile}>Eliminar archivo</IonButton>

      {loading && <IonSpinner name="crescent" />}
      <pre>{output}</pre>
    </PageLayout>
  );
};

export default FilesystemPage;
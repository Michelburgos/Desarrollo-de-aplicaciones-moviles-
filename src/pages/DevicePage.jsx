import PageLayout from "../components/PageLayout";
import { useDevice } from "../hooks/useDevice";

const DevicePage = () => {
  const { battery, info, deviceId, loading, error } = useDevice();

  if (loading) {
    return (
      <PageLayout title="Device" error={error}>
        <p>Cargando...</p>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Device" error={error}>
      <p>Batería: {Math.round((battery?.batteryLevel ?? 0) * 100)}%</p>
      <p>{battery?.isCharging ? "Cargando" : "No cargando"}</p>

      <p>Modelo: {info?.model}</p>
      <p>Plataforma: {info?.platform}</p>
      <p>OS: {info?.operatingSystem}</p>

      <p>ID: {deviceId}</p>
    </PageLayout>
  );
};

export default DevicePage;
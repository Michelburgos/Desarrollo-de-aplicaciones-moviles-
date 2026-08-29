import { useEffect } from "react";

export default function Loader({ onDone }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onDone();
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return <p>Cargando...</p>;
}

import { useState } from "react";
import Loader from "./Loader";
import AddContact from "./Add";
import ContactList from "./list";
import banner from "./assets/banner.png";

export default function App() {
  const [cargando, setCargando] = useState(true);
  const [contactos, setContactos] = useState([]);

  const terminarCarga = () => {
    setContactos([
      { id: 1, nombre: "Michel", telefono: 323387526452 },
      { id: 2, nombre: "Marta", telefono: 1253647895 },
      { id: 3, nombre: "Jorge", telefono: 523364225 },
      { id: 4, nombre: "Santiago", telefono: 555678924 },
    ]);
    setCargando(false);
  };

  const agregarContacto = (nuevoContacto) => {
    setContactos((prev) => [...prev, nuevoContacto]);
  };

  const eliminarContacto = (id) => {
    setContactos((prev) => prev.filter((contacto) => contacto.id !== id));
  };

  if (cargando) {
    return <Loader onDone={terminarCarga} />;
  }

  return (
    <>
      <img
        src={banner}
        alt="Banner de contactos"
        style={{ width: "100%", maxWidth: 500 }}
      />
      <h1>Mis contactos</h1>
      <AddContact onAdd={agregarContacto} />
      <ContactList contactos={contactos} onDelete={eliminarContacto} />
    </>
  );
}

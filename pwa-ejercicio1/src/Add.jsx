import { useState } from 'react';

function AddPatient({ onAdd }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cc, setCc] = useState('');
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!nombre || !apellido || !cc) {
      setError('Nombre, apellido y CC son obligatorios');
      return;
    }

    onAdd({ id: Date.now(), nombre, apellido, cc, telefono });

    setNombre('');
    setApellido('');
    setCc('');
    setTelefono('');
    setError('');
  };

  return (
    <>
      <h3>Agregar Paciente</h3>
      {error && <p>{error}</p>}
      <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
      <input placeholder="Apellido" value={apellido} onChange={e => setApellido(e.target.value)} />
      <input placeholder="CC" value={cc} onChange={e => setCc(e.target.value)} />
      <input placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} />
      <button onClick={handleAdd}>Agregar</button>
    </>
  );
}

export default AddPatient;
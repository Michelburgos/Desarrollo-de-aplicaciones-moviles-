function PatientList({ patients, onDelete }) {
  return (
    <ol>
      {patients.map((p) => (
        <li key={p.id}>
          {p.nombre} {p.apellido} - CC: {p.cc} - Tel: {p.telefono}
          <button onClick={() => onDelete(p.id)}>Eliminar</button>
        </li>
      ))}
    </ol>
  );
}

export default PatientList;
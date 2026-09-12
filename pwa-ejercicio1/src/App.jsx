import { useState, useEffect } from 'react';
import Login from './Login.jsx';
import AddPatient from './Add.jsx';
import SearchBar from './Search.jsx';
import PatientList from './List.jsx';

function App() {
  const [user, setUser] = useState(localStorage.getItem('user') || '');
  const [error, setError] = useState('');
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('patients');
    if (saved) {
      setPatients(JSON.parse(saved));
    } else {
      const defaultPatients = [
        { id: 1, nombre: "Michel", apellido: "Ramírez", cc: "1006452178", telefono: "3233875264" },
        { id: 2, nombre: "Marta", apellido: "Gómez", cc: "43215698", telefono: "3001253647" },
        { id: 3, nombre: "Jorge", apellido: "Torres", cc: "79456123", telefono: "3145233642" },
        { id: 4, nombre: "Santiago", apellido: "López", cc: "1020304050", telefono: "3105556789" },
      ];
      setPatients(defaultPatients);
      localStorage.setItem('patients', JSON.stringify(defaultPatients));
    }
  }, []);

  const login = (username, password) => {
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('user', username);
      setUser(username);
      setError('');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser('');
  };

  const addP = (nuevo) => {
    const nuevaLista = [...patients, nuevo];
    setPatients(nuevaLista);
    localStorage.setItem('patients', JSON.stringify(nuevaLista));
  };

  const deleteP = (id) => {
    const nuevaLista = patients.filter(p => p.id !== id);
    setPatients(nuevaLista);
    localStorage.setItem('patients', JSON.stringify(nuevaLista));
  };

  const filtrados = patients.filter(p => {
    const t = search.toLowerCase();
    return (
      p.nombre.toLowerCase().includes(t) ||
      p.apellido.toLowerCase().includes(t) ||
      p.cc.toLowerCase().includes(t)
    );
  });

  if (!user) {
    return <Login onLogin={login} error={error} />;
  }

  return (
    <>
      <h1>MediClinic</h1>
      <button onClick={logout}>Cerrar Sesión</button>

      <AddPatient onAdd={addP} />
      <SearchBar onSearch={setSearch} />
      <PatientList patients={filtrados} onDelete={deleteP} />
    </>
  );
}

export default App;
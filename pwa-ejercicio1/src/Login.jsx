import { useState } from 'react';

function Login({ onLogin, error }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <h1>MediClinic</h1>
      {error && <p>{error}</p>}
      <input placeholder="Usuario" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} />
      <button onClick={() => onLogin(username, password)}>Ingresar</button>
    </>
  );
}

export default Login;
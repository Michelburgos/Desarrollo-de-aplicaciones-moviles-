import { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === 'user@mail.com' && password === '123') {
      localStorage.setItem('logged', 'true');
      setError('');
      navigate('/home');
    } else {
      setError('Correo o contraseña incorrectos');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            placeholder="Email"
            value={email}
            onIonInput={(e) => setEmail(e.detail.value)}
          />
        </IonItem>

        <IonItem>
          <IonInput
            type="password"
            placeholder="Password"
            value={password}
            onIonInput={(e) => setPassword(e.detail.value)}
          />
        </IonItem>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <IonButton expand="block" onClick={handleLogin}>
          Login
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
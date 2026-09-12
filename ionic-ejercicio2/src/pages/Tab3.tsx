import { useNavigate } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';

const Tab3: React.FC = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('logged');
    navigate('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={logout}>Cerrar sesión</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
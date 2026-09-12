import { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/react';

interface Visita {
  id: number;
  paciente: string;
  hora: string;
  estado: string;
}

const Tab2: React.FC = () => {
  const [pacientes, setPacientes] = useState<string[]>([]);

  useEffect(() => {
    const saved: Visita[] = JSON.parse(localStorage.getItem('visitas') || '[]');
    setPacientes(saved.map(v => v.paciente));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pacientes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {pacientes.map((nombre, index) => (
            <IonItem key={index}>
              <IonLabel>{nombre}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
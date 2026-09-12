import { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/react';

interface Visita {
  id: number;
  paciente: string;
  hora: string;
  estado: string;
}

const Tab1: React.FC = () => {
  const [visitas, setVisitas] = useState<Visita[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('visitas');
    if (saved) {
      setVisitas(JSON.parse(saved));
    } else {
      const defaultVisitas: Visita[] = [
        { id: 1, paciente: 'Michel Ramírez', hora: '08:00', estado: 'pendiente' },
        { id: 2, paciente: 'Marta Gómez', hora: '09:30', estado: 'pendiente' },
        { id: 3, paciente: 'Jorge Torres', hora: '11:00', estado: 'en_camino' },
        { id: 4, paciente: 'Santiago López', hora: '14:00', estado: 'finalizada' },
      ];
      setVisitas(defaultVisitas);
      localStorage.setItem('visitas', JSON.stringify(defaultVisitas));
    }
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Visitas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {visitas.map(v => (
            <IonItem key={v.id} routerLink={`/tabs/detalle/${v.id}`}>
              <IonLabel>
                <h2>{v.paciente}</h2>
                <p>{v.hora} - {v.estado}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

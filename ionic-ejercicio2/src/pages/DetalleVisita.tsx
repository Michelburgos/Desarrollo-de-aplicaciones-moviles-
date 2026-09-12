import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonLabel } from '@ionic/react';

interface Visita {
  id: number;
  paciente: string;
  hora: string;
  estado: string;
}

const DetalleVisita: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [visita, setVisita] = useState<Visita | null>(null);

  useEffect(() => {
    const saved: Visita[] = JSON.parse(localStorage.getItem('visitas') || '[]');
    const encontrada = saved.find(v => v.id === Number(id));
    setVisita(encontrada || null);
  }, [id]);

  const cambiarEstado = () => {
    const saved: Visita[] = JSON.parse(localStorage.getItem('visitas') || '[]');
    const actualizadas = saved.map(v => {
      if (v.id === Number(id)) {
        if (v.estado === 'pendiente') return { ...v, estado: 'en_camino' };
        if (v.estado === 'en_camino') return { ...v, estado: 'finalizada' };
      }
      return v;
    });
    localStorage.setItem('visitas', JSON.stringify(actualizadas));
    setVisita(actualizadas.find(v => v.id === Number(id)) || null);
  };

  if (!visita) return null;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalle</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonLabel>
          <h1>{visita.paciente}</h1>
          <p>Hora: {visita.hora}</p>
          <p>Estado: {visita.estado}</p>
        </IonLabel>

        {visita.estado !== 'finalizada' && (
          <IonButton expand="block" onClick={cambiarEstado}>Avanzar estado</IonButton>
        )}
      </IonContent>
    </IonPage>
  );
};

export default DetalleVisita;
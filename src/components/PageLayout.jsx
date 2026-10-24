import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonButtons,
  IonBackButton, IonContent, IonText,
} from "@ionic/react";


const PageLayout = ({ title, error, children }) => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home" />
        </IonButtons>
        <IonTitle>{title}</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent className="ion-padding">
      {children}

      {error && (
        <IonText color="danger">
          <p>Error: {error.message || String(error)}</p>
        </IonText>
      )}
    </IonContent>
  </IonPage>
);

export default PageLayout;
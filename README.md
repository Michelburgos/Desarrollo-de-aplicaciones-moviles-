# Parcial 2 - Desarrollo de Plataformas Móviles

Aplicación Ionic + React donde el usuario completa misiones y gana puntos. Usa Firebase (Authentication y Firestore) y también guarda el progreso en localStorage.

## Misiones

1. **Evidencia (30 pts):** tomar una foto con la cámara. Se completa al guardar la imagen.
2. **Movimiento real (40 pts):** moverse 50 metros desde la posición inicial (GPS).
3. **Permanencia activa (50 pts):** se habilita al completar la misión 2. Hay que quedarse quieto 10 segundos y luego el celular vibra.

La app también muestra la barra de progreso, la pantalla de resultados, el ranking contra otros 4 usuarios reales y notificaciones locales al completar misiones.

## Acceso

Los usuarios son reales. Para entrar:

* Crear una cuenta en la pantalla **Register** con cualquier correo y una contraseña de mínimo 6 caracteres.
* Luego iniciar sesión en la pantalla **Login**.

## Configuración de Firebase

En `src/firebase/config.js` van los datos del proyecto de Firebase. En la consola de Firebase deben estar activos:

* **Authentication** con el método Correo electrónico/contraseña.
* **Firestore Database**.

## Como correr

```
npm install
npm run dev

```

La aplicación se abre en http://localhost:5173

Para correr en un dispositivo o emulador Android:

```
npm run build
npx cap run android

```

Los sensores (vibración, acelerómetro y notificaciones) funcionan en el celular, no en el navegador.

## Evidencias

Capturas de pantalla en la carpeta /EVIDENCIAS

Michel Dahiana Burgos Santos

const CACHE_NAME = "contactos-cache-v1";

const APP_SHELL = ["/", "/index.html", "/manifest.json", "/cliente.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.destination === "image") {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;

        return fetch(request).then((respuesta) => {
          const copia = respuesta.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copia));
          return respuesta;
        });
      }),
    );
    return;
  }

  event.respondWith(
    fetch(request)
      .then((respuesta) => {
        const copia = respuesta.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copia));
        return respuesta;
      })
      .catch(() => caches.match(request)),
  );
});

// public/sw.js

console.log('Service Worker Cargado.');

// Evento 'push': se activa cuando el servidor envía una notificación
self.addEventListener('push', e => {
    const data = e.data.json(); // Parseamos los datos que vienen en la notificación
    console.log('Push Recibido...', data);

    // Mostramos la notificación
    self.registration.showNotification(data.title, {
        body: data.message,
        icon: '/icon-192x192.png' // Asegúrate de tener un ícono con este nombre en la carpeta 'public'
    });
});
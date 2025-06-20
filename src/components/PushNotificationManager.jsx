// Archivo: src/components/PushNotificationManager.jsx
// Propósito: Gestionar el registro del Service Worker y la suscripción a notificaciones.

import { useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
// Ya no necesitamos importar axios directamente aquí

function PushNotificationManager() {
    // Obtenemos la instancia de apiClient que ya sabe sobre la URL base y el token.
    const { apiClient } = useContext(AuthContext);

    const subscribeUser = useCallback(async (swReg) => {
        try {
            // Petición 1: Obtener la clave pública VAPID.
            // La ruta es relativa a la baseURL de apiClient ('/api')
            const response = await apiClient.get('/notifications/vapid-public-key');
            const vapidPublicKey = response.data;

            const subscription = await swReg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
            });
            
            console.log('Usuario suscrito exitosamente:', subscription);

            // Petición 2: Guardar la suscripción.
            // Esta ruta también es relativa a '/api'.
            await apiClient.post('/notifications/subscribe', subscription);
            console.log('Suscripción enviada y guardada en el servidor.');

        } catch (error) {
            console.error('Fallo al suscribirse a las notificaciones push:', error);
        }
    }, [apiClient]);

    const runPushManager = useCallback(async () => {
        try {
            const swReg = await navigator.serviceWorker.register('/sw.js');
            console.log('Service Worker Registrado:', swReg);

            const subscription = await swReg.pushManager.getSubscription();
            
            if (subscription) {
                console.log('El usuario ya está suscrito.');
                return;
            }

            if (Notification.permission === 'granted') {
                console.log('Permiso ya concedido. Suscribiendo...');
                subscribeUser(swReg);
            } else if (Notification.permission !== 'denied') {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    console.log('Permiso concedido. Suscribiendo...');
                    subscribeUser(swReg);
                }
            } else {
                console.warn('El permiso para notificaciones ha sido bloqueado por el usuario.');
            }
        } catch (error) {
            console.error('Error en el gestor de notificaciones push:', error);
        }
    }, [subscribeUser]);

    useEffect(() => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            runPushManager();
        }
    }, [runPushManager]);

    return null;
}

// Función auxiliar para convertir la clave VAPID
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export default PushNotificationManager;
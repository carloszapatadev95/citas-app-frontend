// src/services/citasService.js
import axios from 'axios';

// URL base de nuestra API. En desarrollo, apunta a nuestro backend local.
// En producción, apuntará a la URL del backend desplegado.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/citas';

// Creamos una instancia de Axios para no tener que escribir la URL base cada vez.
const apiClient = axios.create({
    baseURL: API_URL
});

// Definimos las funciones para cada operación CRUD

// Obtener todas las citas
export const obtenerCitas = () => {
    return apiClient.get('/');
};

// Crear una nueva cita
// 'datosCita' es un objeto, ej: { titulo: '...', fecha: '...' }
export const crearCita = (datosCita) => {
    return apiClient.post('/', datosCita);
};

// Actualizar una cita
// 'id' es el ID de la cita a actualizar, 'datosActualizados' son los nuevos datos
export const actualizarCita = (id, datosActualizados) => {
    return apiClient.put(`/${id}`, datosActualizados);
};

// Eliminar una cita
export const eliminarCita = (id) => {
    return apiClient.delete(`/${id}`);
};
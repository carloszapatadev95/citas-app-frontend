/* eslint-disable no-unused-vars */
// src/services/authService.js (VERSIÓN MODIFICADA)
import axios from 'axios';

/**
 * Esta función auxiliar toma la URL base de la API y extrae solo la parte del dominio.
 * Ejemplo: de 'https://mi-api.com/api/citas' devuelve 'https://mi-api.com'
 * @param {string} fullApiUrl - La URL completa de la API.
 * @returns {string} - La URL base sin rutas.
 */
const getBaseUrl = (fullApiUrl) => {
    try {
        // Creamos un objeto URL para analizar la cadena de texto fácilmente
        const url = new URL(fullApiUrl);
        // Devolvemos el origen, que es 'protocolo://hostname:puerto'
        return url.origin;
    } catch (error) {
        // Si la URL es inválida, devolvemos un string vacío para evitar más errores.
        console.error("URL de API inválida:", fullApiUrl);
        return '';
    }
};

// Obtenemos la URL base desde la variable de entorno
const API_BASE_URL_FROM_ENV = import.meta.env.VITE_API_URL || 'http://localhost:4000';
const baseUrl = getBaseUrl(API_BASE_URL_FROM_ENV);

// --- Funciones de Servicio ---

export const login = (email, password) => {
    // Ahora construimos la URL correcta para el login
    const loginUrl = `${baseUrl}/api/auth/login`;
    console.log("Intentando hacer login en:", loginUrl); // Log para depuración
    return axios.post(loginUrl, { email, password });
};

export const register = (nombre, email, password) => {
    // Y construimos la URL correcta para el registro
    const registerUrl = `${baseUrl}/api/auth/register`;
    console.log("Intentando registrar en:", registerUrl); // Log para depuración
    return axios.post(registerUrl, { nombre, email, password });
};
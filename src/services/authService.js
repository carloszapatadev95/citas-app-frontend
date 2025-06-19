import axios from 'axios';

export const login = (baseUrl, email, password) => {
    // Construimos la URL completa para el endpoint de login
    return axios.post(`${baseUrl}/api/auth/login`, { email, password });
};

export const register = (baseUrl, nombre, email, password) => {
    // Construimos la URL completa para el endpoint de registro
    return axios.post(`${baseUrl}/api/auth/register`, { nombre, email, password });
};
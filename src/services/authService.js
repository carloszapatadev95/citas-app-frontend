// src/services/authService.js
import axios from 'axios';

const API_URL_AUTH = (import.meta.env.VITE_API_URL || 'http://localhost:4000').replace('/citas', '/auth');

export const login = (email, password) => {
    return axios.post(`${API_URL_AUTH}/login`, { email, password });
};

export const register = (nombre, email, password) => {
    return axios.post(`${API_URL_AUTH}/register`, { nombre, email, password });
};
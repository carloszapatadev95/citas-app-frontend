// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import * as authService from '../services/authService.js'; // Crearemos este servicio a continuación

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

// Creamos una instancia de Axios separada para el servicio de citas
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api/citas'
});

// Interceptor para añadir el token a las peticiones de citas
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    
    // --- AÑADIR ESTOS LOGS PARA DEPURAR ---
    console.log("--- Interceptor de Axios ---");
    if (token) {
        console.log("Token encontrado en localStorage:", token.substring(0, 20) + "..."); // Mostramos solo una parte
        config.headers.Authorization = `Bearer ${token}`;
        console.log("Cabecera de Autorización añadida:", config.headers.Authorization.substring(0, 30) + "...");
    } else {
        console.log("No se encontró token en localStorage.");
    }
    console.log("----------------------------");
    // --- FIN DE LOS LOGS ---

    return config;
}, error => {
    // Esto es para errores antes de que la petición se envíe
    return Promise.reject(error);
});


export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true); // Para saber si estamos verificando el token inicial

    // Al cargar la app, verifica si hay un token válido en localStorage
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Aquí podrías añadir una lógica para verificar el token contra el backend
            // Por ahora, asumimos que si hay token, el usuario está logueado.
            // Una versión más robusta haría una petición a un endpoint /api/auth/profile
            setUsuario({ token }); // Simplificado por ahora
        }
        setCargando(false);
    }, []);

    const login = async (email, password) => {
        const response = await authService.login(email, password);
        const { token } = response.data;
        localStorage.setItem('token', token);
        setUsuario({ token });
    };

    const register = async (nombre, email, password) => {
        await authService.register(nombre, email, password);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUsuario(null);
    };

    const value = {
        usuario,
        cargando,
        isAuthenticated: !!usuario, // !! convierte un objeto/null a true/false
        login,
        register,
        logout,
        apiClient, // Exportamos la instancia de Axios configurada
    };

    return (
        <AuthContext.Provider value={value}>
            {!cargando && children}
        </AuthContext.Provider>
    );
};
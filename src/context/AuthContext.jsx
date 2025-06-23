/* eslint-disable react-refresh/only-export-components */
// Archivo: src/context/AuthContext.jsx
// Propósito: Gestionar la autenticación y el estado global del usuario.

import { createContext, useState, useEffect, useMemo} from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { toast } from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import * as authService from '../services/authService.js';

export const AuthContext = createContext(null);

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

    const apiClient = useMemo(() => {
        const client = axios.create({ baseURL: `${API_BASE_URL}/api` });
        client.interceptors.request.use(
            (config) => {
                const currentToken = localStorage.getItem('token');
                if (currentToken) {
                    config.headers.Authorization = `Bearer ${currentToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
        return client;
    }, []);
    
    // Efecto que decodifica el token y actualiza el usuario cada vez que el token cambia.
    useEffect(() => {
        try {
            if (token) {
                const decodedUser = jwtDecode(token);
                setUsuario(decodedUser);
            } else {
                setUsuario(null);
            }
        } catch (error) {
            console.error("Token inválido, cerrando sesión.", error);
            logout();
        } finally {
            setCargando(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    // Efecto para la conexión de Socket.IO (sin cambios)
    useEffect(() => {
        if (!token) return;
        const socket = io(API_BASE_URL);
        socket.on('connect', () => console.log('[Socket.IO] Conectado:', socket.id));
        // eslint-disable-next-line no-unused-vars
        socket.on('recordatorio_cita', (data) => {
            toast.custom(/* ... toast personalizado ... */);
        });
        return () => socket.disconnect();
    }, [token]);

    // --- INICIO DE LA LÓGICA DE AUTENTICACIÓN ---

    // Función para establecer un nuevo token. Será usada por login y la página de suscripción.
    const setAuthToken = (newToken) => {
        if (newToken) {
            localStorage.setItem('token', newToken);
            setToken(newToken); // Esto dispara el useEffect de arriba y actualiza el 'usuario'
        } else {
            // Si se llama sin token, equivale a un logout.
            localStorage.removeItem('token');
            setToken(null);
        }
    };
    
    const login = async (email, password) => {
        const response = await authService.login(API_BASE_URL, email, password);
        setAuthToken(response.data.token);
        toast.success('¡Sesión iniciada con éxito!');
    };

    const register = async (nombre, email, password) => {
        await authService.register(API_BASE_URL, nombre, email, password);
        toast.success('¡Registro exitoso! Ahora puedes iniciar sesión.');
    };

    const logout = () => {
        setAuthToken(null);
        toast('Has cerrado sesión.', { icon: '👋' });
    };

    const value = {
        usuario,
        cargando,
        isAuthenticated: !!token,
        login,
        register,
        logout,
        apiClient,
        API_BASE_URL,
        setAuthToken, // Exportamos la nueva función
    };

    return (
        <AuthContext.Provider value={value}>
            {!cargando && children}
        </AuthContext.Provider>
    );
}
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import * as authService from '../services/authService.js';

export const AuthContext = createContext(null);

// La URL base de la API, SIN NINGUNA RUTA ESPECÍFICA.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

    const apiClient = useMemo(() => {
        const client = axios.create({
            baseURL: `${API_BASE_URL}/api/citas`,
        });

        client.interceptors.request.use(
            (config) => {
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
        
        return client;
    }, [token]);

    // useEffect para validar el token inicial y establecer el estado del usuario.
    useEffect(() => {
        if (token) {
            try {
                // --- CAMBIO AQUÍ: Decodificación manual ---
                // 1. Separamos el token en sus 3 partes (header, payload, signature)
                const payloadBase64 = token.split('.')[1];
                // 2. Decodificamos la parte del payload, que está en base64
                const decodedPayload = JSON.parse(atob(payloadBase64));
                // 3. Establecemos el usuario con la información decodificada
                setUsuario(decodedPayload);
                // -----------------------------------------
            } catch (error) {
                console.error("Token inválido o malformado, limpiando...", error);
                localStorage.removeItem('token');
                setToken(null);
                setUsuario(null);
            }
        }
        setCargando(false);
    }, [token]);

    const login = async (email, password) => {
        const response = await authService.login(API_BASE_URL, email, password);
        const newToken = response.data.token;
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const register = async (nombre, email, password) => {
        await authService.register(API_BASE_URL, nombre, email, password);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUsuario(null);
    };

    const value = {
        token,
        usuario, // Ahora el objeto usuario contendrá { id, nombre, iat, exp }
        cargando,
        isAuthenticated: !!token,
        login,
        register,
        logout,
        apiClient,
    };

    return (
        <AuthContext.Provider value={value}>
            {!cargando && children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
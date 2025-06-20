// Archivo: src/context/AuthContext.jsx
// Propósito: Gestionar el estado de autenticación global, proveer una instancia de Axios configurada,
// y manejar la conexión de WebSocket en tiempo real.

import { createContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { toast } from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import * as authService from '../services/authService.js';

// Creamos el contexto que será accesible por los componentes hijos.
export const AuthContext = createContext(null);

// Definimos la URL base de la API como una constante, usando variables de entorno.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export function AuthProvider({ children }) {
    // --- ESTADOS DEL CONTEXTO ---
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true); // Para saber si estamos verificando el token inicial.

    // --- INSTANCIA DE AXIOS MEMORIZADA ---
    // Se re-crea solo si el 'token' cambia, para que el interceptor se actualice.
    const apiClient = useMemo(() => {
        const client = axios.create({
            baseURL: `${API_BASE_URL}/api`,
        });

        // Interceptor que añade el token a TODAS las peticiones de apiClient.
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

    // --- EFECTOS ---

    // 1. Efecto para inicializar el estado del usuario a partir del token.
    useEffect(() => {
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                setUsuario(decodedUser);
            } catch (error) {
                console.error("Token en localStorage inválido. Limpiando...", error);
                localStorage.removeItem('token');
                setToken(null);
                setUsuario(null);
            }
        }
        setCargando(false);
    }, [token]);

    // 2. Efecto para gestionar la conexión del WebSocket.
    useEffect(() => {
        // Si no hay token (usuario no logueado), no nos conectamos.
        if (!token) return;

        // Conectarse al servidor de sockets.
        const socket = io(API_BASE_URL);

        socket.on('connect', () => {
            console.log('[Socket.IO] Conectado al servidor:', socket.id);
        });

        // Escuchar el evento 'recordatorio_cita' que envía el backend.
        socket.on('recordatorio_cita', (data) => {
            console.log('[Socket.IO] Evento de recordatorio recibido:', data);
            
            // Mostrar una notificación en la UI usando react-hot-toast.
            toast.custom((t) => (
                <div
                  className={`${
                    t.visible ? 'animate-enter' : 'animate-leave'
                  } max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                  <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        <span className="text-2xl">🗓️</span>
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {data.title}
                        </p>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {data.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
            ), {
                duration: 10000, // La notificación dura 10 segundos
                position: 'bottom-right' // La mostramos en otra esquina
            });
        });

        // Función de limpieza: se ejecuta cuando el token cambia o el componente se desmonta.
        return () => {
            console.log('[Socket.IO] Desconectando...');
            socket.disconnect();
        };

    }, [token]); // Este efecto depende del token. Si el token cambia (logout), se desconecta.

    // --- FUNCIONES DE AUTENTICACIÓN ---

    const login = async (email, password) => {
        const response = await authService.login(API_BASE_URL, email, password);
        const newToken = response.data.token;
        localStorage.setItem('token', newToken);
        setToken(newToken);
        toast.success('¡Sesión iniciada con éxito!');
    };

    const register = async (nombre, email, password) => {
        await authService.register(API_BASE_URL, nombre, email, password);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUsuario(null);
        toast('Has cerrado sesión.', { icon: '👋' });
    };

    // --- VALOR DEL CONTEXTO ---
    const value = {
        token,
        usuario,
        cargando,
        isAuthenticated: !!token,
        login,
        register,
        logout,
        apiClient, // Cliente configurado para rutas protegidas
        API_BASE_URL // URL base para peticiones no autenticadas o a otros servicios
    };

    return (
        <AuthContext.Provider value={value}>
            {/* No renderizamos los hijos hasta que la comprobación inicial del token haya terminado */}
            {!cargando && children}
        </AuthContext.Provider>
    );
};
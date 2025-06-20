import { useState, useEffect, useContext, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext.jsx';
import { ThemeContext } from '../context/ThemeContext.jsx';
import { ModalContext } from '../context/ModalContext.jsx';
import { themeConfig } from '../theme/themeConfig.js';
// Este componente ya no necesita importar CitaForm o ModalWrapper directamente
// porque esa lógica se ha movido a App.jsx

function CitasPage() {
    // --- ESTADOS LOCALES DE LA PÁGINA ---
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- CONTEXTOS ---
    const { apiClient, isAuthenticated } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const styles = themeConfig[theme];
    const { abrirModal } = useContext(ModalContext); // Solo necesitamos la función para abrir el modal

    // --- MANEJO DE DATOS ---
    const cargarCitas = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            // La petición ahora es a '/citas', que se añade a la baseURL de apiClient ('.../api')
            const response = await apiClient.get('/citas');
            const citasOrdenadas = response.data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
            setCitas(citasOrdenadas);
        } catch (err) {
            setError('No se pudieron cargar las citas. Tu sesión puede haber caducado.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [apiClient]);

    // Efecto para cargar las citas cuando el estado de autenticación cambia.
    useEffect(() => {
        if (isAuthenticated) {
            cargarCitas();
        } else {
            setCitas([]);
            setLoading(false);
        }
    }, [isAuthenticated, cargarCitas]);

    // --- MANEJO DE EVENTOS (HANDLERS) ---

    const handleEliminarCita = useCallback(async (id) => {
        if (window.confirm('...')) {
            try {
                await apiClient.delete(`/citas/${id}`);
                setCitas(prevCitas => prevCitas.filter(cita => cita.id !== id));
                toast.success('Cita eliminada correctamente.'); // Notificación de éxito
            } catch (err) {
                console.error("Error al eliminar la cita:", err);
                toast.error('No se pudo eliminar la cita.'); // Notificación de error
            }
        }
    }, [apiClient]);

    // ...

    // La lógica de handleFormSubmit y del modal ahora vive en App.jsx.
    // Esta página solo necesita saber cómo ABRIR el modal.

    // --- RENDERIZADO ---
    if (loading) return <div className="text-center p-10">Cargando...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
                <h1 className={`text-4xl font-bold ${styles.text.primary}`}>
                    Mis Citas
                </h1>
                <button
                    onClick={() => abrirModal()} // Llama a abrirModal sin argumentos para crear
                    className={`py-2 px-5 rounded-lg font-semibold transition-transform transform hover:scale-105 ${styles.button.primary}`}
                >
                    + Nueva Cita
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {citas.length > 0 ? (
                    citas.map((cita) => (
                        <div key={cita.id} className={`flex flex-col p-6 rounded-lg shadow-md border ${styles.card}`}>
                            <div className="flex-grow">
                                <h3 className={`text-xl font-bold mb-2 ${styles.text.primary}`}>{cita.titulo}</h3>
                                <p className={`text-sm mb-2 ${styles.text.secondary}`}>
                                    {new Date(cita.fecha).toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' })}
                                </p>
                                <p className={`mb-4 ${styles.text.secondary}`}>{cita.descripcion}</p>
                            </div>
                            <div className="flex justify-end space-x-2 mt-4">
                                <button
                                    onClick={() => handleEliminarCita(cita.id)}
                                    className={`py-1 px-3 text-sm rounded-lg focus:outline-none focus:ring-2 ${styles.button.secondary}`}
                                >
                                    Eliminar
                                </button>
                                <button
                                    onClick={() => abrirModal(cita)} // Llama a abrirModal con la cita para editar
                                    className={`py-1 px-3 text-sm rounded-lg focus:outline-none focus:ring-2 ${styles.button.primary}`}
                                >
                                    Editar
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center mt-10 p-6 rounded-lg bg-white/50 dark:bg-slate-800/50">
                        <p className={`${styles.text.primary} text-lg`}>No tienes citas agendadas.</p>
                        <button onClick={() => abrirModal()} className="text-indigo-500 hover:underline mt-2 font-semibold">
                            ¡Crea la primera!
                        </button>
                    </div>
                )}
            </div>
            {/* El ModalWrapper ya no se renderiza aquí, fue movido a App.jsx */}
        </div>
    );
}

export default CitasPage;
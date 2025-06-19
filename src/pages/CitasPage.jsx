import { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { ThemeContext } from '../context/ThemeContext.jsx';
import { themeConfig } from '../theme/themeConfig.js';
import CitaForm from '../components/CitaForm.jsx';
import { ModalContext } from '../context/ModalContext.jsx';
import ModalWrapper from '../components/ModalWrapper.jsx'; // Importamos el componente del Modal

function CitasPage() {
    // --- ESTADOS ---
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [citaSeleccionada, setCitaSeleccionada] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Nuevo estado para el modal

    // --- CONTEXTOS ---
    const { apiClient, isAuthenticated } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const styles = themeConfig[theme];

    // --- MANEJO DE DATOS ---
    const cargarCitas = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await apiClient.get('/');
            const citasOrdenadas = response.data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
            setCitas(citasOrdenadas);
        } catch (err) {
            setError('No se pudieron cargar las citas. Tu sesión puede haber expirado.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [apiClient]);

    useEffect(() => {
        if (isAuthenticated) {
            cargarCitas();
        } else {
            setCitas([]);
            setLoading(false);
        }
    }, [isAuthenticated, cargarCitas]);

    // --- MANEJO DE EVENTOS (HANDLERS) ---
    const cerrarModal = () => {
        setIsModalOpen(false);
        setCitaSeleccionada(null); // Limpiar selección al cerrar
    };
    
    const abrirModalCrear = () => {
        setCitaSeleccionada(null);
        setIsModalOpen(true);
    };

    const abrirModalEditar = (cita) => {
        setCitaSeleccionada(cita);
        setIsModalOpen(true);
    };

    const handleFormSubmit = useCallback(async (datosCita) => {
        try {
            if (citaSeleccionada) {
                await apiClient.put(`/${citaSeleccionada.id}`, datosCita);
            } else {
                await apiClient.post('/', datosCita);
            }
            cerrarModal(); // Cierra el modal después de guardar
            cargarCitas(); // Recarga la lista de citas
        } catch (err) {
            console.error("Error al guardar la cita:", err);
            throw err; 
        }
    }, [apiClient, citaSeleccionada, cargarCitas]);

    const handleEliminarCita = useCallback(async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta cita?')) {
            try {
                await apiClient.delete(`/${id}`);
                setCitas(prevCitas => prevCitas.filter(cita => cita.id !== id));
            } catch (err) {
                console.error("Error al eliminar la cita:", err);
                alert("No se pudo eliminar la cita.");
            }
        }
    }, [apiClient]);

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
                    onClick={abrirModalCrear}
                    className={`py-2 px-5 rounded-lg font-semibold transition-transform transform hover:scale-105 ${styles.button.primary}`}
                >
                    + Nueva Cita
                </button>
            </div>

            {/* El CitaForm ya no se renderiza aquí directamente */}

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
                                    onClick={() => abrirModalEditar(cita)}
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
                        <button onClick={abrirModalCrear} className="text-indigo-500 hover:underline mt-2 font-semibold">
                            ¡Crea la primera!
                        </button>
                    </div>
                )}
            </div>

            {/* Renderizamos el Modal aquí, fuera del flujo principal */}
            <ModalWrapper
                isOpen={isModalOpen}
                onRequestClose={cerrarModal}
                title={citaSeleccionada ? 'Editar Cita' : 'Agendar Nueva Cita'}
            >
                <CitaForm
                    onCitaSubmit={handleFormSubmit}
                    citaAEditar={citaSeleccionada}
                    onCancel={cerrarModal}
                />
            </ModalWrapper>
        </div>
    );
}

export default CitasPage;
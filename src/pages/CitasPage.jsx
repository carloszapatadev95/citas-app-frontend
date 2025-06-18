import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx';
import { themeConfig } from '../theme/themeConfig.js';
import * as citasService from '../services/citasService.js';
import CitaForm from '../components/CitaForm.jsx';

function CitasPage() {
    // Estado para la lista de citas, la carga y los errores
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Nuevo estado para gestionar la cita que se está editando
    const [citaSeleccionada, setCitaSeleccionada] = useState(null);

    const { theme } = useContext(ThemeContext);
    const styles = themeConfig[theme];

    // Cargar las citas del backend cuando el componente se monta por primera vez
    useEffect(() => {
        cargarCitas();
    }, []);

    const cargarCitas = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await citasService.obtenerCitas();
            // Ordenamos las citas por fecha para mostrar las más recientes primero
            const citasOrdenadas = response.data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
            setCitas(citasOrdenadas);
        } catch (err) {
            setError('No se pudieron cargar las citas. Asegúrate de que el servidor backend esté funcionando.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Función que se pasa al formulario para manejar la creación o actualización de una cita
    const handleFormSubmit = async (datosCita) => {
        try {
            if (citaSeleccionada) {
                // Si hay una cita seleccionada, estamos editando
                await citasService.actualizarCita(citaSeleccionada.id, datosCita);
            } else {
                // Si no, estamos creando una nueva
                await citasService.crearCita(datosCita);
            }
            // Reseteamos el estado de edición y recargamos la lista
            setCitaSeleccionada(null);
            cargarCitas();
        } catch (err) {
            console.error("Error al guardar la cita:", err);
            throw err; // Propagamos el error para que el formulario lo muestre
        }
    };
    
    // Función para manejar la eliminación de una cita
    const handleEliminarCita = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta cita?')) {
            try {
                await citasService.eliminarCita(id);
                // Actualizamos el estado local para una respuesta de UI instantánea
                setCitas(citas.filter(cita => cita.id !== id));
            } catch (err) {
                console.error("Error al eliminar la cita:", err);
                alert("No se pudo eliminar la cita.");
            }
        }
    };
    
    // Funciones para el flujo de edición
    const handleEditarClick = (cita) => {
        setCitaSeleccionada(cita);
        // Hacemos scroll suave hacia la parte superior para que el usuario vea el formulario
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelarEdicion = () => {
        setCitaSeleccionada(null);
    };

    // Renderizado condicional basado en el estado de carga y error
    if (loading) return <div className="text-center p-10">Cargando citas...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto">
            <h1 className={`text-4xl font-bold mb-8 text-center ${styles.text.primary}`}>
                Gestor de Citas
            </h1>

            <CitaForm
                onCitaSubmit={handleFormSubmit}
                citaAEditar={citaSeleccionada}
                onCancel={handleCancelarEdicion}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {citas.length > 0 ? (
                    citas.map((cita) => (
                        <div key={cita.id} className={`flex flex-col p-6 rounded-lg shadow-md border ${styles.card}`}>
                            <div className="flex-grow">
                                <h3 className={`text-xl font-bold mb-2 ${styles.text.primary}`}>{cita.titulo}</h3>
                                <p className={`text-sm mb-2 ${styles.text.secondary}`}>
                                    {/* Formateamos la fecha a un formato más legible */}
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
                                    onClick={() => handleEditarClick(cita)}
                                    className={`py-1 px-3 text-sm rounded-lg focus:outline-none focus:ring-2 ${styles.button.primary}`}
                                >
                                    Editar
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center mt-10">No hay citas agendadas. ¡Crea la primera!</p>
                )}
            </div>
        </div>
    );
}

export default CitasPage;
import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx';
import { themeConfig } from '../theme/themeConfig.js';

/**
 * Componente de formulario para crear o editar una cita.
 * @param {object} props
 * @param {function} props.onCitaSubmit - Función que se llama al enviar el formulario.
 * @param {object|null} props.citaAEditar - Objeto de la cita a editar, o null si se está creando una nueva.
 * @param {function} props.onCancel - Función que se llama para cancelar el modo de edición.
 */
function CitaForm({ onCitaSubmit, citaAEditar, onCancel }) {
    // Estado para cada campo del formulario
    const [titulo, setTitulo] = useState('');
    const [fecha, setFecha] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [error, setError] = useState(null);

    const { theme } = useContext(ThemeContext);
    const styles = themeConfig[theme];
    
    // Determina si el formulario está en modo de edición basándose en si existe 'citaAEditar'
    const modoEdicion = Boolean(citaAEditar);

    // useEffect se ejecuta cuando 'citaAEditar' cambia. Rellena el formulario si estamos editando.
    useEffect(() => {
        if (modoEdicion) {
            setTitulo(citaAEditar.titulo);
            // El input 'datetime-local' requiere un formato específico: YYYY-MM-DDTHH:mm
            // new Date().toISOString() da un formato como "2024-08-15T10:00:00.000Z"
            // .slice(0, 16) lo corta para que quede en el formato correcto.
            const fechaFormateada = new Date(citaAEditar.fecha).toISOString().slice(0, 16);
            setFecha(fechaFormateada);
            setDescripcion(citaAEditar.descripcion || '');
            setError(null); // Limpia errores anteriores al empezar a editar
        } else {
            // Si no estamos en modo edición, nos aseguramos de que el formulario esté limpio.
            setTitulo('');
            setFecha('');
            setDescripcion('');
        }
    }, [citaAEditar, modoEdicion]);


    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene la recarga de la página

        if (!titulo || !fecha) {
            setError('El título y la fecha son obligatorios.');
            return;
        }

        try {
            // Llama a la función del padre para procesar los datos
            await onCitaSubmit({ titulo, fecha, descripcion });
            
            // Si creamos una cita nueva (no en modo edición), limpiamos el formulario
            if (!modoEdicion) {
                setTitulo('');
                setFecha('');
                setDescripcion('');
            }
            setError(null);
        } catch (err) {
            setError('No se pudo guardar la cita. Por favor, inténtalo de nuevo.');
            console.error(err);
        }
    };

    return (
        <div className={`p-6 mb-8 rounded-lg shadow-md border ${styles.card}`}>
            <h2 className={`text-2xl font-bold mb-4 ${styles.text.primary}`}>
                {modoEdicion ? 'Editar Cita' : 'Agendar Nueva Cita'}
            </h2>
            <form onSubmit={handleSubmit}>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                
                <div className="mb-4">
                    <label htmlFor="titulo" className={`block mb-2 font-semibold ${styles.text.secondary}`}>Título</label>
                    <input
                        id="titulo"
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        className={`w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500/50 ${styles.input}`}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="fecha" className={`block mb-2 font-semibold ${styles.text.secondary}`}>Fecha y Hora</label>
                    <input
                        id="fecha"
                        type="datetime-local"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        className={`w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500/50 ${styles.input}`}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="descripcion" className={`block mb-2 font-semibold ${styles.text.secondary}`}>Descripción (Opcional)</label>
                    <textarea
                        id="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className={`w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500/50 ${styles.input}`}
                        rows="3"
                    ></textarea>
                </div>
                
                <div className="flex space-x-4 mt-4">
                    <button
                        type="submit"
                        className={`w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-75 ${styles.button.primary}`}
                    >
                        {modoEdicion ? 'Guardar Cambios' : 'Agendar Cita'}
                    </button>
                    {/* Botón de cancelar que solo aparece en modo edición */}
                    {modoEdicion && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="w-full py-2 px-4 rounded-lg bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default CitaForm;
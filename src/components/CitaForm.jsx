// Archivo: src/components/CitaForm.jsx
// Propósito: Formulario para crear y editar citas, con manejo correcto de zonas horarias.

import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx';
import { themeConfig } from '../theme/themeConfig.js';

/**
 * Función auxiliar para convertir una fecha UTC (en formato string ISO)
 * a un string que el input 'datetime-local' pueda mostrar en la hora local correcta.
 */
const formatISOToLocalInput = (isoString) => {
    if (!isoString) return '';
    
    // 1. Crear un objeto Date a partir del string UTC. El objeto representará ese momento exacto en el tiempo.
    const date = new Date(isoString);
    
    // 2. "Engañar" al formato ISO. Le restamos el desfase horario para que al generar el string,
    // la hora coincida con la hora local del usuario.
    // getTimezoneOffset() devuelve la diferencia en minutos (ej. 300 para UTC-5).
    const userTimezoneOffset = date.getTimezoneOffset() * 60000; // en milisegundos
    const localDate = new Date(date.getTime() - userTimezoneOffset);
    
    // 3. Convertir la fecha ajustada a un string ISO y cortar los segundos y milisegundos.
    return localDate.toISOString().slice(0, 16);
};


function CitaForm({ onCitaSubmit, citaAEditar, onCancel }) {
    const [titulo, setTitulo] = useState('');
    const [fecha, setFecha] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { theme } = useContext(ThemeContext);
    const styles = themeConfig[theme];
    
    const modoEdicion = Boolean(citaAEditar);

    // useEffect se ejecuta cuando 'citaAEditar' cambia.
    useEffect(() => {
        if (modoEdicion) {
            setTitulo(citaAEditar.titulo);
            
            // --- INICIO DE LA CORRECCIÓN ---
            // Usamos nuestra nueva función para formatear la fecha UTC a la hora local del usuario
            // para mostrarla correctamente en el input.
            const fechaLocalParaInput = formatISOToLocalInput(citaAEditar.fecha);
            setFecha(fechaLocalParaInput);
            // --- FIN DE LA CORRECCIÓN ---
            
            setDescripcion(citaAEditar.descripcion || '');
            setError(null);
        } else {
            // Limpiar el formulario cuando no estamos en modo edición.
            setTitulo('');
            setFecha('');
            setDescripcion('');
        }
    }, [citaAEditar, modoEdicion]);


    // Maneja el envío del formulario. Esta lógica ya era correcta.
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!titulo || !fecha) {
            setError('El título y la fecha son obligatorios.');
            return;
        }
        
        setLoading(true);
        setError(null);

        // El valor de `fecha` del input es interpretado por `new Date()` como hora local.
        // `.toISOString()` lo convierte correctamente a UTC para enviarlo al backend.
        const fechaUTC = new Date(fecha).toISOString();

        try {
            await onCitaSubmit({ titulo, fecha: fechaUTC, descripcion });
            
            if (!modoEdicion) {
                setTitulo('');
                setFecha('');
                setDescripcion('');
            }
        } catch (err) {
            setError('No se pudo guardar la cita. Por favor, inténtalo de nuevo.');
            console.error(err);
        } finally {
            setLoading(false);
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
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="fecha" className={`block mb-2 font-semibold ${styles.text.secondary}`}>Fecha y Hora (Tu Hora Local)</label>
                    <input
                        id="fecha"
                        type="datetime-local"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        className={`w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500/50 ${styles.input}`}
                        required
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
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-75 ${styles.button.primary} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Guardando...' : (modoEdicion ? 'Guardar Cambios' : 'Agendar Cita')}
                    </button>
                    
                    {modoEdicion && (
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={loading}
                            className={`w-full py-2 px-4 rounded-lg bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
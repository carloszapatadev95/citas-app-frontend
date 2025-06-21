// Archivo: src/components/CitaForm.jsx
// Propósito: Formulario para crear y editar citas, ahora con manejo de zona horaria.

import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx';
import { themeConfig } from '../theme/themeConfig.js';

function CitaForm({ onCitaSubmit, citaAEditar, onCancel }) {
    // Estados para cada campo del formulario
    const [titulo, setTitulo] = useState('');
    const [fecha, setFecha] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Añadimos estado de carga

    const { theme } = useContext(ThemeContext);
    const styles = themeConfig[theme];
    
    const modoEdicion = Boolean(citaAEditar);

    // useEffect para rellenar el formulario cuando se edita una cita
    useEffect(() => {
        if (modoEdicion) {
            setTitulo(citaAEditar.titulo);
            // La fecha viene del backend en formato UTC (string ISO).
            // La convertimos a un objeto Date y luego la formateamos
            // para que el input 'datetime-local' pueda mostrarla.
            const fechaFormateada = new Date(citaAEditar.fecha).toISOString().slice(0, 16);
            setFecha(fechaFormateada);
            setDescripcion(citaAEditar.descripcion || '');
            setError(null);
        } else {
            setTitulo('');
            setFecha('');
            setDescripcion('');
        }
    }, [citaAEditar, modoEdicion]);


    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!titulo || !fecha) {
            setError('El título y la fecha son obligatorios.');
            return;
        }
        
        setLoading(true);
        setError(null);

        // --- INICIO DE LA CORRECCIÓN DE ZONA HORARIA ---
        // El valor de 'fecha' del estado es un string como "2025-06-20T17:30".
        // new Date(fecha) lo interpreta como la fecha y hora en la zona horaria LOCAL del navegador.
        // .toISOString() la convierte a un string estándar universal en formato UTC.
        // Ejemplo: "2025-06-20T22:30:00.000Z" (si estás en UTC-5)
        const fechaUTC = new Date(fecha).toISOString();
        // --- FIN DE LA CORRECCIÓN ---

        try {
            // Enviamos la fecha en formato UTC al backend
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
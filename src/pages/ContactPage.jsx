// Archivo: src/pages/ContactPage.jsx
// Propósito: Mostrar información de contacto y permitir a los usuarios enviar mensajes a través de un formulario funcional.

import { useState, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { ThemeContext } from '../context/ThemeContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx'; // Se usa para obtener la URL base de la API
import { themeConfig } from '../theme/themeConfig.js';
import * as contactService from '../services/contactService.js';

function ContactPage() {
  const { theme } = useContext(ThemeContext);
  const { API_BASE_URL } = useContext(AuthContext); 
  const styles = themeConfig[theme];

  // --- ESTADOS PARA EL FORMULARIO ---
  const [formData, setFormData] = useState({
    name: '',
    email_contact: '', // Usamos 'email_contact' para no confundir con el email del usuario logueado
    message: ''
  });
  const [loading, setLoading] = useState(false);

  // --- MANEJADORES DE EVENTOS ---
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactService.sendMessage(API_BASE_URL, formData);
      toast.success('¡Mensaje enviado con éxito! Gracias por contactarnos.');
      // Limpiar el formulario después de un envío exitoso
      setFormData({ name: '', email_contact: '', message: '' });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'No se pudo enviar el mensaje en este momento.';
      toast.error(errorMessage);
      console.error("Error al enviar el formulario de contacto:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className={`text-4xl md:text-5xl font-extrabold text-center mb-6 ${styles.text.primary}`}>
          Ponte en <span className="text-indigo-500">Contacto</span>
        </h1>
        <p className={`text-lg text-center mb-12 ${styles.text.secondary}`}>
          ¿Tienes alguna pregunta, sugerencia o simplemente quieres saludar? ¡Nos encantaría escucharte!
        </p>

        <div className={`p-8 rounded-xl shadow-lg border ${styles.card} grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-300 hover:shadow-xl`}>
          
          {/* --- SECCIÓN DE INFORMACIÓN (SIN CAMBIOS) --- */}
          <div className="space-y-6">
            <div>
              <h3 className={`text-xl font-bold mb-2 ${styles.text.primary}`}>Información General</h3>
              <p className={styles.text.secondary}>
                Proyecto educativo desarrollado por{" "}
                <span className="relative inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium px-2 py-0.5 rounded-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer">
                  SolteDev
                </span>{" "}
                para dominar React y desarrollo Full-Stack.
              </p>
            </div>
            <div>
              <h4 className={`font-semibold mb-1 ${styles.text.primary}`}>Correo Electrónico</h4>
              <a href="mailto:contacto@soltedev.com" className="text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center group transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                contacto@soltedev.com
              </a>
            </div>
            <div>
              <h4 className={`font-semibold mb-1 ${styles.text.primary}`}>Ubicación</h4>
              <p className={`${styles.text.secondary} flex items-center`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-red-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Planeta Tierra (Remoto)
              </p>
            </div>
            {/* Redes Sociales (sin cambios) */}
          </div>

          {/* --- SECCIÓN DE FORMULARIO (CON FUNCIONALIDAD AÑADIDA) --- */}
          <div>
            <h3 className={`text-xl font-bold mb-4 ${styles.text.primary}`}>Envía un Mensaje</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className={`block text-sm font-medium mb-1 ${styles.text.secondary}`}>Nombre</label>
                <input
                  type="text" id="name" placeholder="Tu nombre" required
                  value={formData.name} onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${styles.input}`}
                />
              </div>
              <div>
                <label htmlFor="email_contact" className={`block text-sm font-medium mb-1 ${styles.text.secondary}`}>Email</label>
                <input
                  type="email" id="email_contact" placeholder="tu@email.com" required
                  value={formData.email_contact} onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${styles.input}`}
                />
              </div>
              <div>
                <label htmlFor="message" className={`block text-sm font-medium mb-1 ${styles.text.secondary}`}>Mensaje</label>
                <textarea
                  id="message" rows="4" placeholder="Escribe tu mensaje aquí..." required
                  value={formData.message} onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${styles.input}`}
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${styles.button.primary} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
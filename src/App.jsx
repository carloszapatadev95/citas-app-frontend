// Archivo: src/App.jsx
// Propósito: Layout principal de la aplicación, gestor de estado del modal y notificaciones UI.

import { Outlet } from "react-router-dom";
import { useContext, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast'; // Se importa Toaster y la función toast
import { ThemeContext } from './context/ThemeContext.jsx';
import { AuthContext } from './context/AuthContext.jsx';
import { ModalContext } from './context/ModalContext.jsx';
import { themeConfig } from './theme/themeConfig.js';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ModalWrapper from "./components/ModalWrapper.jsx";
import CitaForm from "./components/CitaForm.jsx";
import PushNotificationManager from './components/PushNotificationManager.jsx';

function App() {
  const { theme } = useContext(ThemeContext);
  const { isAuthenticated, apiClient } = useContext(AuthContext);
  const { isModalOpen, citaAEditar, cerrarModal } = useContext(ModalContext);

  const styles = themeConfig[theme];
  const appContainerClasses = styles.app;

  // --- LÓGICA DE FORMULARIO CON NOTIFICACIONES TOAST INTEGRADAS ---
  const handleFormSubmit = useCallback(async (datosCita) => {
    const isEditing = !!citaAEditar;
    const successMessage = `Cita ${isEditing ? 'actualizada' : 'creada'} exitosamente!`;
    // const errorMessage = `No se pudo ${isEditing ? 'actualizar' : 'crear'} la cita.`;

    try {
      if (isEditing) {
        await apiClient.put(`/citas/${citaAEditar.id}`, datosCita);
      } else {
        await apiClient.post('/citas', datosCita);
      }

      cerrarModal();
      toast.success(successMessage); // <--- NOTIFICACIÓN DE ÉXITO

      // Recargamos para ver los cambios. Es la solución simple por ahora.
      // Una mejora futura sería usar un estado global o un sistema de caché.
      if (window.location.pathname.includes('/citas')) {
        setTimeout(() => window.location.reload(), 1500); // Pequeño delay para que el usuario vea el toast
      }

    } catch (err) {
      console.error("Error al guardar la cita:", err);
      const errorMessage = err.response?.data?.message || `No se pudo ${isEditing ? 'actualizar' : 'crear'} la cita.`;
      toast.error(errorMessage); // <--- NOTIFICACIÓN DE ERROR

    }
  }, [apiClient, citaAEditar, cerrarModal]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${appContainerClasses}`}>
      {/* El componente Toaster renderiza todas las notificaciones creadas con toast() */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: theme === 'light' ? '#ffffff' : '#334155',
            color: theme === 'light' ? '#1f2937' : '#f8fafc',
            border: `1px solid ${theme === 'light' ? '#e5e7eb' : '#475569'}`,
          },
        }}
      />

      <Navbar />

      <main className="flex-grow container mx-auto px-4 pb-8" style={{ marginTop: '5rem' }}>
        <Outlet />
      </main>

      {isAuthenticated && <PushNotificationManager />}

      {/* El modal y su contenido, gestionado por el estado centralizado en App */}
      <ModalWrapper
        isOpen={isModalOpen}
        onRequestClose={cerrarModal}
        title={citaAEditar ? 'Editar Cita' : 'Agendar Nueva Cita'}
      >
        <CitaForm
          onCitaSubmit={handleFormSubmit}
          citaAEditar={citaAEditar}
          onCancel={cerrarModal}
        />
      </ModalWrapper>

      <Footer />
    </div>
  );
}

export default App;
// Archivo: src/App.jsx
// Propósito: Layout principal de la aplicación, gestor del modal, y proveedor de notificaciones UI (Toaster).

import { Outlet } from "react-router-dom";
import { useContext, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { ThemeContext } from './context/ThemeContext.jsx';
import { AuthContext } from './context/AuthContext.jsx';
import { ModalContext } from './context/ModalContext.jsx';
import { themeConfig } from './theme/themeConfig.js';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ModalWrapper from "./components/ModalWrapper.jsx";
import CitaForm from "./components/CitaForm.jsx";
import PushNotificationManager from './components/PushNotificationManager.jsx';

export default function App() {
  const { theme } = useContext(ThemeContext);
  const { isAuthenticated, apiClient } = useContext(AuthContext); 
  const { isModalOpen, citaAEditar, cerrarModal } = useContext(ModalContext);

  const styles = themeConfig[theme];
  const appContainerClasses = styles.app;

  // Lógica centralizada para manejar el envío del formulario de citas.
  const handleFormSubmit = useCallback(async (datosCita) => {
    const isEditing = !!citaAEditar;
    const successMessage = `Cita ${isEditing ? 'actualizada' : 'creada'} exitosamente!`;

    try {
        if (isEditing) {
            await apiClient.put(`/citas/${citaAEditar.id}`, datosCita);
        } else {
            await apiClient.post('/citas', datosCita);
        }
        
        cerrarModal();
        toast.success(successMessage); // Notificación de éxito

        // Recargamos la página de citas para ver los cambios.
        if (window.location.pathname.includes('/citas')) {
            setTimeout(() => window.location.reload(), 1500); 
        }
        
    } catch (err) {
        console.error("Error al guardar la cita:", err);
        
        const errorMessage = err.response?.data?.message || `No se pudo crear la cita.`;
        const reason = err.response?.data?.reason;

        // Lógica para mostrar un toast de error específico si se alcanza el límite
        if (reason === 'limit_reached') {
            toast.error((t) => (
                <span className="text-center">
                    {errorMessage}
                    <a 
                        href="/subscribe" 
                        className="font-bold underline ml-2 text-indigo-500" 
                        onClick={() => toast.dismiss(t.id)}
                    >
                        Hazte Pro
                    </a>
                </span>
            ), { duration: 6000 }); // Damos más tiempo para que el usuario haga clic
        } else {
            // Toast de error genérico para otros fallos
            toast.error(errorMessage);
        }
        
        // No re-lanzamos el error para evitar que el CitaForm muestre otro mensaje.
        // throw err;
    }
  }, [apiClient, citaAEditar, cerrarModal]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${appContainerClasses}`}>
      {/* 
        El componente Toaster se coloca aquí, en el nivel más alto.
        Se encargará de renderizar todas las notificaciones creadas con la función toast().
        Le aplicamos estilos que reaccionan a nuestro theme.
      */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: theme === 'light' ? '#ffffff' : '#334155', // bg-white | bg-slate-700
            color: theme === 'light' ? '#1f2937' : '#f1f5f9',    // text-gray-800 | text-slate-100
            border: `1px solid ${theme === 'light' ? '#e5e7eb' : '#475569'}`, // border-gray-200 | border-slate-600
          },
        }}
      />

      <Navbar />

      <main className="flex-grow container mx-auto px-4 pb-8" style={{ marginTop: '5rem' }}>
        {/* Aquí es donde React Router renderiza la página actual (Welcome, Citas, etc.) */}
        <Outlet />
      </main>
      
      {/* El gestor de notificaciones push se renderiza condicionalmente */}
      {isAuthenticated && <PushNotificationManager />}
      
      {/* El modal se renderiza aquí para estar disponible globalmente */}
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

      <Footer/>
    </div>
  );
}
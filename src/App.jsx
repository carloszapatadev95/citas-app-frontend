// src/App.jsx (VERSIÓN FINAL)
import { Outlet } from "react-router-dom";
import { useContext, useCallback } from 'react';
import { ThemeContext } from './context/ThemeContext.jsx';
import { AuthContext } from './context/AuthContext.jsx';
import { ModalContext } from './context/ModalContext.jsx'; // 1. Importar ModalContext
import { themeConfig } from './theme/themeConfig.js';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ModalWrapper from "./components/ModalWrapper.jsx"; // 2. Importar ModalWrapper
import CitaForm from "./components/CitaForm.jsx";       // 3. Importar CitaForm

function App() {
  const { theme } = useContext(ThemeContext);
  const styles = themeConfig[theme];
  const appContainerClasses = styles.app;

  // 4. Consumir el estado y las funciones del modal aquí
  const { isModalOpen, citaAEditar, cerrarModal } = useContext(ModalContext);
  
  // 5. Necesitamos la lógica de submit y de recarga aquí también
  const { apiClient } = useContext(AuthContext);

  const handleFormSubmit = useCallback(async (datosCita) => {
      try {
          if (citaAEditar) {
              await apiClient.put(`/api/citas/${citaAEditar.id}`, datosCita);
          } else {
              await apiClient.post('/api/citas', datosCita);
          }
          cerrarModal();
          // OJO: Ya no podemos llamar a cargarCitas() directamente.
          // La solución más simple es recargar la página donde están las citas.
          // Una solución avanzada usaría un pub/sub o una librería de estado global.
          if (window.location.pathname === '/citas') {
              window.location.reload();
          }
      } catch (err) {
          console.error("Error al guardar la cita:", err);
          throw err;
      }
  }, [apiClient, citaAEditar, cerrarModal]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${appContainerClasses}`}>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 pb-8" style={{ marginTop: '5rem' }}>
        <Outlet />
      </main>
      
      {/* 6. Pegar el ModalWrapper aquí, al final del layout */}
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

export default App;
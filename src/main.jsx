import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import Modal from 'react-modal';
import { ThemeProvider } from '../src/context/ThemeContext.jsx'; // Importa el ThemeProvider
import router from './router/index.jsx'; // Importa el router desde el nuevo archivo
import './index.css'; // Asegúrate de que tu CSS de Tailwind esté importado
import { AuthProvider } from './context/AuthContext.jsx';
import { ModalProvider } from './context/ModalContext.jsx';

Modal.setAppElement('#root');
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <ModalProvider> 
          <RouterProvider router={router} />
        </ModalProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
);
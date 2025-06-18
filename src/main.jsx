import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '../src/context/ThemeContext.jsx'; // Importa el ThemeProvider
import router from './router/index.jsx'; // Importa el router desde el nuevo archivo
import './index.css'; // Asegúrate de que tu CSS de Tailwind esté importado

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)

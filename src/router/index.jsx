// src/router/index.jsx (NUEVO ARCHIVO)

import { createBrowserRouter } from 'react-router-dom';

// Importa el Layout principal y las páginas
// import App from '../App.jsx';
import WelcomePage from '../pages/WelcomePage.jsx';
import HomePage from '../pages/HomePage.jsx';
import AboutPage from '../pages/AboutPage.jsx';
import ContactPage from '../pages/ContactPage.jsx';
import CitasPage from '../pages/CitasPage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import RutaProtegida from '../components/RutaProtegida.jsx';
import SubscriptionPage from '../pages/SubscriptionPage.jsx';
import App from '../App.jsx';

// Creamos y exportamos el router directamente
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App actúa como el Layout que contiene el <Outlet/>
    children: [
      
     // Rutas que requieren autenticación
     {
      element: <RutaProtegida />,
      children: [
        { 
          index: true, // La ruta raíz ('/') ahora muestra WelcomePage
          element: <WelcomePage />,
          
      },
      {
        path: 'citas', // La lista de citas ahora está en '/citas'
        element: <CitasPage />
    },
     { path: 'subscribe',
       element: <SubscriptionPage /> 
      },
         
      ]
  },
  // Rutas públicas
  { path: 'login', element: <LoginPage /> },
  { path: 'register', element: <RegisterPage /> },
  { path: 'about', element: <AboutPage /> }, // <-- Asegúrate de que estas existan
  { path: 'contact', element: <ContactPage /> },
  
    ]
  }
]);

export default router;
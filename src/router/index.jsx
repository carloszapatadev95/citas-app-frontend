// src/router/index.jsx (NUEVO ARCHIVO)

import { createBrowserRouter } from 'react-router-dom';

// Importa el Layout principal y las páginas
// import App from '../App.jsx';
import HomePage from '../pages/HomePage.jsx';
import AboutPage from '../pages/AboutPage.jsx';
import ContactPage from '../pages/ContactPage.jsx';
import CitasPage from '../pages/CitasPage.jsx';

// Creamos y exportamos el router directamente
const router = createBrowserRouter([
  {
    path: '/',
    element: <CitasPage />, // App actúa como el Layout que contiene el <Outlet/>
    children: [
      {
        index: true, // Esto hace que HomePage sea la ruta por defecto para '/'
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      // ¡Puedes añadir más rutas aquí fácilmente!
      // { path: 'products', element: <ProductsPage /> },
    ]
  }
]);

export default router;
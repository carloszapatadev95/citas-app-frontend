// src/context/ThemeContext.jsx (CORREGIDO Y COMPLETO)
import { createContext, useState, useEffect } from 'react';

// ¡LA CORRECCIÓN! Añadimos 'export' para que otros archivos puedan importarlo.
 const ThemeContext = createContext(null);

 const ThemeProvider = ({ children }) => {
  // Lógica de persistencia para leer desde localStorage al iniciar
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  // Efecto para guardar en localStorage cada vez que el tema cambia
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};


export { ThemeProvider, ThemeContext };
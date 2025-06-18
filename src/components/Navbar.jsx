import { useState, useContext } from 'react';
import { NavLink } from "react-router-dom";
import { ThemeContext } from '../context/ThemeContext'; // Importa el contexto del tema
import { themeConfig } from '../theme/themeConfig';   // Importa la configuración de estilos (extensión .js corregida)

// Array de objetos para los enlaces de navegación, para no repetir código (principio DRY)
const navLinks = [
    { to: "/", text: "Inicio" },
    { to: "/about", text: "Acerca de" },
    { to: "/contact", text: "Contacto" },
];

export default function Navbar() {
    // Estado para controlar la visibilidad del menú móvil
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Consumimos el contexto para obtener el tema actual y la función para cambiarlo
    const { theme, toggleTheme } = useContext(ThemeContext);

    // Obtenemos el objeto de estilos correspondiente al tema actual desde la configuración centralizada
    const styles = themeConfig[theme];

    // Función que determina las clases CSS para los NavLink, ahora usa la configuración del tema
    const getNavLinkClasses = ({ isActive }) => {
        const commonClasses = "px-3 py-2 rounded-md transition-colors duration-300 cursor-pointer";
        if (isActive) {
            // Estilos para el enlace activo
            return `${commonClasses} text-indigo-500 font-bold underline decoration-indigo-500 underline-offset-4`;
        }
        // Estilos para enlaces inactivos, usando el hover desde la configuración del tema
        return `${commonClasses} ${styles.navlink.hover} font-medium`;
    };

    // Funciones para manejar el menú móvil
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        // El fondo del nav ahora se obtiene de la configuración centralizada (styles.navbar)
        <nav className={`${styles.navbar} shadow-md fixed top-0 left-0 right-0 z-50`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Título o Logo de la aplicación */}
                    <div className="text-xl font-bold"> Mi Curso React </div>
                    
                    {/* Menú de Navegación para Escritorio */}
                    <ul className="hidden md:flex items-center space-x-4 text-lg">
                        {/* Mapeamos el array navLinks para crear los enlaces dinámicamente */}
                        {navLinks.map((link) => (
                            <li key={link.to}>
                                <NavLink to={link.to} className={getNavLinkClasses}>
                                    {link.text}
                                </NavLink>
                            </li>
                        ))}
                        {/* Botón de cambio de tema */}
                        <li>
                            <button 
                                onClick={toggleTheme} 
                                   className={`p-2 rounded-full ${styles.button.icon}`} // Usa el hover desde la configuración
                                aria-label="Cambiar tema"
                            >
                                {theme === 'light' ? '🌙' : '☀️'}
                            </button>
                        </li>
                    </ul>

                    {/* Botón de Hamburguesa para el menú móvil */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="p-2" aria-label="Abrir menú">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    // Icono 'X' cuando el menú está abierto
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    // Icono de hamburguesa cuando el menú está cerrado
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Contenedor del Menú Móvil */}
                <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden pb-4`}>
                    <ul className="flex flex-col items-center space-y-2 text-lg">
                        {navLinks.map((link) => (
                            <li key={link.to}>
                                <NavLink 
                                    to={link.to} 
                                    className={getNavLinkClasses} 
                                    onClick={closeMenu} // Cierra el menú al hacer clic en un enlace
                                >
                                    {link.text}
                                </NavLink>
                            </li>
                        ))}
                        {/* Botón de cambio de tema para el menú móvil */}
                        <li>
                             <button 
                                onClick={toggleTheme} 
                                className={`w-full mt-4 flex items-center justify-center p-2 rounded-md ${styles.button.mobileMenu}`}
              >
                                Cambiar a tema {theme === 'light' ? 'oscuro' : 'claro'}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
// Archivo: src/components/Navbar.jsx
// Propósito: Barra de navegación principal, dinámica según el estado de autenticación y el plan del usuario.

import { useState, useContext } from 'react';
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { themeConfig } from '../theme/themeConfig';

// Definimos los enlaces de navegación. Se mostrarán a los usuarios logueados.
const navLinks = [
    { to: "/", text: "Inicio" },
    { to: "/citas", text: "Mis Citas" },
    { to: "/contact", text: "Contacto" },
];

export default function Navbar() {
    // Estado para controlar el menú móvil
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // Consumimos los contextos para obtener el estado y las funciones
    const { isAuthenticated, logout, usuario } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    
    const styles = themeConfig[theme];
    const navigate = useNavigate();

    // Lógica para el botón "Hazte Pro": se muestra si el usuario está logueado Y su plan no es 'pro'.
    const mostrarBotonPro = isAuthenticated && usuario?.plan !== 'pro';

    // Clases para los enlaces de navegación, distinguiendo el estado activo
    const getNavLinkClasses = ({ isActive }) => {
        const commonClasses = "px-3 py-2 rounded-md transition-colors duration-300 cursor-pointer";
        if (isActive) {
            return `${commonClasses} text-indigo-500 font-bold underline decoration-indigo-500 underline-offset-4`;
        }
        return `${commonClasses} ${styles.navlink.hover} font-medium`;
    };

    // Clases para los enlaces en el menú móvil (overlay), con texto más grande
    const getMobileNavLinkClasses = ({ isActive }) => {
        return `${getNavLinkClasses({ isActive })} text-2xl`;
    };

    // Maneja el cierre de sesión
    const handleLogout = () => {
        logout();
        closeMenu();
        navigate('/login');
    };

    // Funciones para abrir y cerrar el menú móvil
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);
    
    const nombreUsuario = usuario ? usuario.nombre : '';

    return (
        <nav className={`${styles.navbar} shadow-md fixed top-0 left-0 right-0 z-50`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Título de la App */}
                    <Link to="/" className="text-xl font-bold"> Mi Gestor de Citas </Link>
                    
                    {/* Menú de Navegación para Escritorio */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isAuthenticated && (
                            <ul className="flex items-center space-x-4 text-lg">
                                {navLinks.map((link) => (
                                    <li key={link.to}>
                                        <NavLink to={link.to} className={getNavLinkClasses}>
                                            {link.text}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Contenedor de botones de la derecha */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <button onClick={toggleTheme} className={`p-2 rounded-full ${styles.button.icon}`} aria-label="Cambiar tema">
                            {theme === 'light' ? '🌙' : '☀️'}
                        </button>

                        {/* Botón "Hazte Pro" condicional */}
                        {mostrarBotonPro && (
                            <Link to="/subscribe" className="hidden sm:block">
                                <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-sm py-2 px-4 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-200">
                                    ✨ Hazte Pro
                                </button>
                            </Link>
                        )}

                        {/* Renderizado condicional: Logout vs Login/Register */}
                        {isAuthenticated ? (
                            <div className="hidden md:flex items-center space-x-4">
                                <span className="font-semibold text-sm hidden lg:block">Hola, {nombreUsuario}</span>
                                <button onClick={handleLogout} className={`py-2 px-4 rounded-lg text-sm font-semibold ${styles.button.secondary}`}>
                                    Cerrar Sesión
                                </button>
                            </div>
                        ) : (
                            <div className="hidden md:flex items-center space-x-2">
                                <Link to="/login" className="px-4 py-2 text-sm font-semibold hover:text-indigo-500 dark:hover:text-indigo-400">Login</Link>
                                <Link to="/register" className={`py-2 px-4 rounded-lg text-sm font-semibold ${styles.button.primary}`}>Registrarse</Link>
                            </div>
                        )}

                        {/* Botón de Hamburguesa para móvil */}
                        <div className="md:hidden">
                            <button onClick={toggleMenu} className="p-2" aria-label="Abrir menú">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menú Overlay Móvil */}
            <div className={`fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden ${styles.navbar} flex flex-col items-center justify-center`}>
                <button onClick={closeMenu} className="absolute top-4 right-4 p-2" aria-label="Cerrar menú">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                
                <ul className="flex flex-col items-center space-y-8 text-center">
                    {isAuthenticated ? (
                        <>
                            <li className="font-bold text-xl">Hola, {nombreUsuario}</li>
                            {navLinks.map((link) => (
                                <li key={link.to}>
                                    <NavLink to={link.to} className={getMobileNavLinkClasses} onClick={closeMenu}>
                                        {link.text}
                                    </NavLink>
                                </li>
                            ))}
                             {/* Botón "Hazte Pro" también en el menú móvil */}
                            {mostrarBotonPro && (
                                <li>
                                    <Link to="/subscribe" onClick={closeMenu}>
                                         <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-200">
                                            ✨ ¡Actualizar a Pro!
                                        </button>
                                    </Link>
                                </li>
                            )}
                            <li className="pt-8">
                                <button onClick={handleLogout} className={`py-2 px-6 rounded-lg font-semibold ${styles.button.secondary}`}>
                                    Cerrar Sesión
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login" onClick={closeMenu} className="text-2xl font-semibold hover:text-indigo-500">Login</Link></li>
                            <li><Link to="/register" onClick={closeMenu} className="text-2xl font-semibold hover:text-indigo-500">Registrarse</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}
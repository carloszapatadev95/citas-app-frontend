import { useState, useContext } from 'react';
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { themeConfig } from '../theme/themeConfig';

const navLinks = [
    { to: "/", text: "Inicio" },
    { to: "/about", text: "Acerca de" },
    { to: "/contact", text: "Contacto" },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const styles = themeConfig[theme];
    const navigate = useNavigate();

    const getNavLinkClasses = ({ isActive }) => {
        const commonClasses = "px-3 py-2 rounded-md transition-colors duration-300 cursor-pointer";
        if (isActive) {
            return `${commonClasses} text-indigo-500 font-bold underline decoration-indigo-500 underline-offset-4`;
        }
        return `${commonClasses} ${styles.navlink.hover} font-medium`;
    };

    const getMobileNavLinkClasses = ({ isActive }) => {
        const desktopClasses = getNavLinkClasses({ isActive });
        return `${desktopClasses} text-lg py-2 w-full text-center`;
    };

    const handleLogout = () => {
        logout();
        closeMenu();
        navigate('/login');
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className={`${styles.navbar} shadow-md fixed top-0 left-0 right-0 z-50`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo/Título */}
                    <Link to="/" className="text-xl font-bold">Mi Curso React</Link>
                    
                    {/* Menú de Escritorio */}
                    {isAuthenticated && (
                        <ul className="hidden md:flex items-center space-x-4 text-lg">
                            {navLinks.map((link) => (
                                <li key={link.to}>
                                    <NavLink to={link.to} className={getNavLinkClasses}>
                                        {link.text}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Contenedor de botones */}
                    <div className="flex items-center space-x-4 ml-auto">
                        <button 
                            onClick={toggleTheme} 
                            className={`p-2 rounded-full ${styles.button.icon}`}
                            aria-label="Cambiar tema"
                        >
                            {theme === 'light' ? '🌙' : '☀️'}
                        </button>

                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className={`hidden md:block py-2 px-4 rounded-lg text-sm font-semibold ${styles.button.secondary}`}
                            >
                                Cerrar Sesión
                            </button>
                        ) : (
                            <div className="hidden md:flex items-center space-x-2">
                                <Link to="/login" className={`px-4 py-2 rounded-lg text-sm font-semibold ${styles.button.outline}`}>
                                    Login
                                </Link>
                                <Link to="/register" className={`py-2 px-4 rounded-lg text-sm font-semibold ${styles.button.primary}`}>
                                    Registrarse
                                </Link>
                            </div>
                        )}

                        {/* Botón Hamburguesa */}
                        <div className="md:hidden">
                            <button 
                                onClick={toggleMenu} 
                                className="p-2"
                                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {isMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menú Móvil - Versión Mejorada */}
                <div className={`
                    fixed inset-0 z-40 
                    ${isMenuOpen ? 'visible bg-black bg-opacity-50' : 'invisible'} 
                    transition-all duration-300
                    md:hidden
                `}>
                    {/* Fondo que cierra el menú */}
                    <div 
                        className="absolute inset-0" 
                        onClick={closeMenu}
                    ></div>
                    
                    {/* Panel del menú */}
                    <div className={`
                        absolute top-0 right-0 h-full w-3/4 max-w-xs
                        transform transition-all duration-300 ease-in-out 
                        ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} 
                        ${styles.navbar} 
                        flex flex-col
                        overflow-y-auto
                        shadow-xl
                    `}>
                        <button 
                            onClick={closeMenu} 
                            className="absolute top-4 right-4 p-2"
                            aria-label="Cerrar menú"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        <ul className="flex flex-col space-y-4 w-full px-4 py-8 mt-12">
                            {isAuthenticated ? (
                                <>
                                    {navLinks.map((link) => (
                                        <li key={link.to} className="w-full">
                                            <NavLink 
                                                to={link.to} 
                                                className={getMobileNavLinkClasses} 
                                                onClick={closeMenu}
                                            >
                                                {link.text}
                                            </NavLink>
                                        </li>
                                    ))}
                                    <li className="w-full pt-4">
                                        <button 
                                            onClick={handleLogout}
                                            className={`w-full py-2 px-4 rounded-lg font-medium ${styles.button.secondary}`}
                                        >
                                            Cerrar Sesión
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="w-full">
                                        <Link 
                                            to="/login" 
                                            onClick={closeMenu}
                                            className={getMobileNavLinkClasses({ isActive: false })}
                                        >
                                            Login
                                        </Link>
                                    </li>
                                    <li className="w-full">
                                        <Link 
                                            to="/register" 
                                            onClick={closeMenu}
                                            className={getMobileNavLinkClasses({ isActive: false })}
                                        >
                                            Registrarse
                                        </Link>
                                    </li>
                                </>
                            )}
                            <li className="w-full pt-4">
                                <button 
                                    onClick={() => {
                                        toggleTheme();
                                        closeMenu();
                                    }}
                                    className={`w-full py-2 px-4 rounded-lg font-medium ${styles.button.outline}`}
                                >
                                    Cambiar a tema {theme === 'light' ? 'oscuro' : 'claro'}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
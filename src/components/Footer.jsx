// src/components/Footer.jsx (Mejorado con ThemeContext)
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { ThemeContext } from '../context/ThemeContext'; // 1. Importar el contexto
import { themeConfig } from '../theme/themeConfig'; // Importar la configuración del tema

function Footer() {
    const { theme } = useContext(ThemeContext); // 2. Consumir el tema
    const currentYear = new Date().getFullYear();

    const styles = themeConfig[theme]; // 3. Obtener estilos del tema actual
   

    return (
        <footer className={`shadow-inner mt-auto transition-colors duration-300 ${styles.footer}`}>
            <div className={`max-w-4xl mx-auto py-6 px-4 text-center ${styles.text.primary}`}>
                
                <div className="flex justify-center space-x-6 mb-4">
                    {/* Los 'a' ahora usan las clases de icono dinámicas */}
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.text.link} aria-label="Facebook">
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.text.link} aria-label="Twitter">
                        <FontAwesomeIcon icon={faTwitter} size="2x" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.text.link} aria-label="Instagram">
                        <FontAwesomeIcon icon={faInstagram} size="2x" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.text.link} aria-label="LinkedIn">
                        <FontAwesomeIcon icon={faLinkedin} size="2x" />
                    </a>
                </div>

                <p className="text-sm">© {currentYear} Mi Curso React. Todos los derechos reservados.</p>
                <p className="text-sm mt-1">
                    Creado con ❤️ usando React, Vite y Tailwind CSS.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
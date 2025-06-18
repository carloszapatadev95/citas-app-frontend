import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext'; // 1. Importar el contexto
import { themeConfig } from '../theme/themeConfig'; // Importar la configuración del tema


function ContactPage() {
    const { theme } = useContext(ThemeContext);
    const styles = themeConfig[theme];

    return (
      <div className={`text-center p-8 rounded-xl shadow-lg ${styles.card}`}>
        <h1 className={`text-4xl font-bold mb-4 ${styles.text.primary}`}>Contacto</h1>
        <p className={`text-lg ${styles.text.secondary}`}>
          Puedes encontrarnos en el vasto mundo de Internet.
        </p>
        <a href="mailto:info@example.com" className={`text-indigo-600 hover:underline ${styles.text.link}`}>
          info@example.com
        </a>
      </div>
    );
  }
  
  export default ContactPage;
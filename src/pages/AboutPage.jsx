import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext'; // 1. Importar el contexto
import { themeConfig } from '../theme/themeConfig'; // Importar la configuración del tema

function AboutPage() {
    const { theme } = useContext(ThemeContext);
    const styles = themeConfig[theme];

    return (
      <div className={`text-center p-8 rounded-xl shadow-lg ${styles.card}`}>
        <h1 className={`text-4xl font-bold mb-4 ${styles.text.primary}`}>Acerca de Nosotros</h1>
        <p className={`text-lg ${styles.text.secondary}`}>
          Somos una aplicación de ejemplo creada para aprender React Router.
          ¡Nuestro objetivo es construir aplicaciones web increíbles!
        </p>
      </div>
    );
  }
  
  export default AboutPage;
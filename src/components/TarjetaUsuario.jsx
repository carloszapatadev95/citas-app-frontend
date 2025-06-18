// src/components/TarjetaUsuario.jsx (Mejorado con Tailwind y ThemeContext)
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { themeConfig } from '../theme/themeConfig'; // Importar la configuración del tema

function TarjetaUsuario(props) {
  // 1. Consumimos el contexto
  const { theme } = useContext(ThemeContext);
  const styles = themeConfig[theme]; // 2. Obtenemos las clases del tema actual

  return (
    // 3. Aplicamos las clases
    <div className={`p-6 my-4 text-center rounded-xl backdrop-blur-sm ${styles.card}`}>
      <h2 className={`text-2xl font-bold ${styles.text.primary}`}>Pasando Props</h2>
      <p className={`text-base mb-4 ${styles.text.secondary}`}>
        Este es un componente que recibe props y las muestra.
      </p>
      
      {/* La tarjeta interna con la información del usuario */}
      <div className={`p-4 rounded-lg border shadow-inner ${styles.card}`}>
        <h3 className={`text-xl font-semibold ${styles.text.primary}`}>
          {props.usuario.nombre}
        </h3>
        <p className={`text-base mb-4 ${styles.text.secondary}`}>
          Edad: {props.usuario.edad}
        </p>
      </div>
    </div>
  );
}

export default TarjetaUsuario;
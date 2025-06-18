// src/components/Saludo.jsx (Mejorado con Tailwind y ThemeContext)
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { themeConfig } from '../theme/themeConfig'; // 1. Importar

function Saludo(props) {
  // 1. Consumimos el contexto para obtener el tema
  const { theme } = useContext(ThemeContext);

const styles = themeConfig[theme]; // 2. Obtenemos las clases del tema actual

  return (
    // 3. Aplicamos las clases de Tailwind y las clases dinámicas
    <div className={`p-8 my-4 rounded-lg shadow-lg text-center border transition-colors duration-300 ${styles.card}`}>
      <h1 className={`text-3xl font-bold mb-2 ${styles.text.primary}`}>
        ¡Hola desde mi primer componente! 👋
      </h1>
      <h2 className={`text-2xl font-semibold flex items-center justify-center ${styles.text.secondary}`}>
        ¡Hola, {props.nombre}! {props.emoji}
      </h2>
    </div>
  );
}

export default Saludo;
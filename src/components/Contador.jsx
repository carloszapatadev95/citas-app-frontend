// src/components/Contador.jsx (REFACTORIZADO)
import { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { themeConfig } from '../theme/themeConfig'; // 1. Importar

function Contador() {
  const [conteo, setConteo] = useState(0);
  const { theme } = useContext(ThemeContext);
  const styles = themeConfig[theme]; // 2. Obtener estilos

  return (
    // 3. Usar los estilos centralizados
    <div className={`p-6 rounded-lg shadow-md m-4 text-center border transition-colors duration-300 ${styles.card}`}>
      <h2 className={`text-2xl font-bold mb-4 ${styles.text.primary}`}>Componente Contador</h2>
      <p className={`text-lg mb-4 ${styles.text.secondary}`}>
        El botón ha sido presionado <span className="font-bold text-green-500 text-xl">{conteo}</span> veces.
      </p>
      <button
        onClick={() => setConteo(conteo + 1)}
            className={`py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-transform transform hover:scale-105 ${styles.button.primary}`}
      >

        Presióname
      </button>
    </div>
  );
}
export default Contador;
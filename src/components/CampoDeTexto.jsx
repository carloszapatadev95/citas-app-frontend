// src/components/CampoDeTexto.jsx (Mejorado con ThemeContext)
import { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { themeConfig } from '../theme/themeConfig'; // 1. Importar

function CampoDeTexto() {
  const [texto, setTexto] = useState('');
  const { theme } = useContext(ThemeContext); // 2. Consumir el tema

  const manejarCambio = (evento) => {
    setTexto(evento.target.value);
  };

  // 3. Clases dinámicas para los elementos del componente
  const styles = themeConfig[theme];

  return (
    <div className={`border rounded-lg p-6 m-4 shadow-md transition-colors duration-300 ${styles.card}`}>
      <label htmlFor="campo-texto" className={`block text-xl font-semibold mb-2 ${styles.text.primary}`}>
        Componente de Input Controlado
      </label>

      <input
        id="campo-texto"
        type="text"
        value={texto}
        onChange={manejarCambio}
        placeholder="Escribe algo aquí..."
        className={`w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors duration-300 ${styles.input}`}
      />

      <p className={`${styles.text.secondary} my-4`}>Texto actual: <strong>{texto}</strong></p>

      <button onClick={() => setTexto('')}  className={`py-2 px-4 rounded-lg focus:outline-none focus:ring-2 ${styles.button.secondary}`}
      >
        Limpiar
      </button>
    </div>
  );
}

export default CampoDeTexto;
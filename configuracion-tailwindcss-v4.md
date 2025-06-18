# Configuración de Tailwind CSS v4 con React y Vite

Este documento detalla los pasos para integrar Tailwind CSS v4 en un proyecto de React creado con Vite, asegurando que los estilos se apliquen correctamente.

## Requisitos Previos

Asegúrate de tener Node.js y npm (o Yarn) instalados en tu sistema.

## Pasos de Configuración

Sigue estos pasos para configurar Tailwind CSS v4 en tu proyecto:

### 1. Actualizar `package.json`

Primero, necesitas asegurarte de tener las dependencias correctas. La clave para Tailwind CSS v4 con Vite es el plugin `@tailwindcss/vite`.

1.  **Abre tu terminal** en la raíz de tu proyecto.
2.  **Instala el plugin de Tailwind CSS para Vite**:

    ```bash
    npm install -D tailwindcss @tailwindcss/vite
    ```

    Después de este comando, tu sección `devDependencies` en `package.json` debería lucir similar a esta (las versiones pueden variar ligeramente):

    ```json
    "devDependencies": {
      // ... otras dependencias de desarrollo
      "tailwindcss": "^4.1.8", // O la última versión estable de v4
      "@tailwindcss/vite": "^4.1.8", // O la última versión estable
      "vite": "^6.3.5" // O la última versión estable
    }
    ```

### 2. Configurar `vite.config.js`

Este es el archivo más importante para integrar Tailwind CSS v4 con Vite. Necesitamos importar y añadir el plugin `@tailwindcss/vite` a la lista de plugins.

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // <-- Importa el plugin de Tailwind CSS

// [https://vitejs.dev/config/](https://vitejs.dev/config/)
export default defineConfig({
  plugins: [
    react(),
    tailwindcss() // <-- Añade el plugin de Tailwind CSS aquí
  ],
  server: {
    port: 3000, // Puerto de desarrollo, puedes ajustarlo si es necesario
  },
});


### 3. Configurartailwind.config.js

Este archivo le dice a Tailwind dónde buscar las clases que estás utilizando en tu código para generar el CSS final.

Si no tienes un tailwind.config.js, puedes generarlo ejecutando:

Intento

npx tailwindcss init
Abre el archivo tailwind.config.js y asegúrate de que la propiedad content escanee tus archivos .html, .js, .ts, .jsx y .tsx.

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ¡Importante! Asegúrate de que esta línea esté presente.
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

#### 4. Configurarsrc/index.css
Para Tailwind CSS v4, la forma de importar los estilos globales es más simple. En lugar de las directivas tradicionales @tailwind base; @tailwind components; @tailwind utilities;, ahora solo necesitas una única directiva de importación.

Abre el archivo src/index.css y asegúrate de que contenga solo esto:
/* src/index.css */
@import "tailwindcss";


###  5. Verificar postcss.config.js (¡Eliminar si existe!)
Con @tailwindcss/vite, ya no necesitas un archivo postcss.config.js para integrar Tailwind CSS. Si tienes este archivo en la raíz de tu proyecto, debes eliminarlo para evitar conflictos:

rm postcss.config.js # En sistemas Unix/Linux/macOS
del postcss.config.js # En Windows

### 6. Asegurar la Importación ensrc/main.jsx
Tu archivo principal de React (src/main.jsx) debe importar el CSS global. Esto probablemente ya esté configurado, pero es bueno confirmarlo.
// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // <-- ¡Esta línea es crucial!
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
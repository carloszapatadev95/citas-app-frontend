import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- Importa el plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss() // <-- Añade el plugin de Tailwind CSS aquí
  ],
  server: {
    port: 3000,
  },
})
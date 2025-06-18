// src/theme/themeConfig.js (NUEVO ARCHIVO)

// Este archivo centraliza todas las clases de Tailwind dependientes del tema.
// Así, si queremos cambiar un color, lo hacemos en un solo lugar.

export const themeConfig = {
  light: {
    app: 'bg-gray-100 text-gray-900',
    navbar: 'bg-white backdrop-blur-sm',
    footer: 'bg-slate-200 border-t border-slate-300',
    text: {
      primary: 'text-slate-800',
      secondary: 'text-slate-600 font-semibold text-2xl',
      link: 'hover:text-indigo-600',
      icon: 'text-slate-500 hover:text-indigo-600',
    },
    card: 'bg-white border-gray-200',
    input: 'bg-white border-gray-300 text-gray-900 focus:border-indigo-500',
   
       navlink: {
      hover: 'hover:bg-gray-200'
    },
     button: {
      // Estilo para el botón principal (ej. "Presióname", "Guardar")
      primary: 'bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus:ring-indigo-500',
      // Estilo para el botón secundario (ej. "Limpiar", "Cancelar")
      secondary: 'bg-red-600 text-white font-semibold hover:bg-red-700 focus:ring-red-500',
      // Estilo para botones que solo contienen un icono (ej. cambio de tema)
      icon: 'hover:bg-gray-200',
      // Estilo para botones dentro del menú móvil (puede ser un caso especial)
      mobileMenu: 'bg-gray-200'
    },
  },
  dark: {
    app: 'bg-gray-900 text-gray-100',
    navbar: 'bg-slate-800 backdrop-blur-sm',
    footer: 'bg-slate-900 border-t border-slate-800',
    text: {
      primary: 'text-slate-100',
      secondary: 'text-gray-300 font-semibold text-2xl',
      link: 'hover:text-indigo-400',
      icon: 'text-slate-400 hover:text-indigo-400',
    },
    card: 'bg-slate-800 border-slate-700',
    input: 'bg-slate-700 border-gray-600 text-white focus:border-indigo-400',
     navlink: {
      hover: 'dark:hover:bg-gray-700'
    },
         button: {
      // Los mismos nombres de variantes, pero con colores para modo oscuro
      primary: 'bg-indigo-500 text-white font-semibold hover:bg-indigo-600 focus:ring-indigo-400',
      secondary: 'bg-red-500 text-white font-semibold hover:bg-red-600 focus:ring-red-400',
      icon: 'dark:hover:bg-gray-700',
      mobileMenu: 'dark:bg-gray-700'
    },
  
  }
};
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Mi Primera App con React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
// Haga clic en los logotipos de Vite y React para obtener más información      </p>
//     </>
//   )
// }

// export default App// src/App.jsx
// src/App.jsx (actualizado)
import Saludo from './components/Saludo.jsx';
import TarjetaUsuario from './components/TarjetaUsuario.jsx';
import Contador from './components/Contador.jsx';
import CampoDeTexto from './components/CampoDeTexto.jsx';


const listaDeUsuarios = [
  { id: 1, nombre: 'Elena', edad: 28 },
  { id: 2, nombre: 'Javier', edad: 35 },
  { id: 3, nombre: 'Marta', edad: 22 },
  { id: 4, nombre: 'Maria', edad: 23 },
  { id: 5, nombre: 'Maria v', edad: 22 },
];

function App() {
  return (
    <div>
      <h1 style={{ color: 'rgb(0, 123, 255)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Mi Aplicación de Componentes</h1>
      {/* Le pasamos las props como si fueran atributos de HTML */}
      <Saludo nombre="Ana" emoji="👩‍💻" />
      <Saludo nombre="David" emoji="🚀" />
      <Saludo nombre="Aprendiz" emoji="💡" />

      {/* Renderizamos la lista de usuarios */}
       <h1>Módulo 2: Pasando Props</h1>
      {listaDeUsuarios.map((usuario) => (
        <TarjetaUsuario key={usuario.id} usuario={usuario} />
      ))}


       <h1>Módulo 3: Estado y Eventos</h1>
      <Contador />
      <hr />
      <CampoDeTexto />

    </div>
  );
}

export default App;



// Reutilizaremos nuestros componentes existentes aquí
import Contador from '../components/Contador';
import CampoDeTexto from '../components/CampoDeTexto';
import Saludo from '../components/Saludo';
import TarjetaUsuario from '../components/TarjetaUsuario.jsx';

// Imagina que estos datos vienen de una base de datos o una API
const listaDeUsuarios = [
  { id: 1, nombre: 'Elena', edad: 28 },
  { id: 2, nombre: 'Javier', edad: 35 },
  { id: 3, nombre: 'Marta', edad: 22 },
];

function HomePage() {
  return (
    <div className="space-y-8 text-center">
      <h1 className="text-4xl font-bold ">Página de Inicio</h1>
        <p className="mt-4">¡Bienvenido a nuestra aplicación con múltiples rutas!</p>
      <Saludo nombre="Carlos" emoji="😎" />
       {listaDeUsuarios.map((usuario) => (
        <TarjetaUsuario
          key={usuario.id} // ¡MUY IMPORTANTE!
          usuario={usuario}
        />
      ))}
      <Contador />
      <CampoDeTexto />
    </div>
  );
}

export default HomePage;
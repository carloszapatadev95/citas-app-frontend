import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function RutaProtegida() {
    const { isAuthenticated, cargando } = useContext(AuthContext);

    // Si todavía estamos verificando si hay un token (al recargar la página),
    // mostramos un mensaje de carga para evitar un parpadeo o redirección prematura.
    if (cargando) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div>Cargando sesión...</div>
            </div>
        );
    }

    // Si el usuario está autenticado, renderiza el contenido de la ruta hija (ej. CitasPage).
    // Si no, lo redirige a la página de login.
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default RutaProtegida;
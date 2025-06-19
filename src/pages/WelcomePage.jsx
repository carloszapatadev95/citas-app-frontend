// src/pages/WelcomePage.jsx
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { themeConfig } from '../theme/themeConfig';
import { ModalContext } from '../context/ModalContext.jsx';

function WelcomePage() {
    const { theme } = useContext(ThemeContext);
    const { usuario } = useContext(AuthContext); // Asumimos que AuthContext provee info del usuario
    const styles = themeConfig[theme];

    // Decodificar el nombre del token si es necesario
    // Esta es una forma simple, en producción se usaría una librería como jwt-decode
    const nombreUsuario = usuario ? JSON.parse(atob(usuario.token.split('.')[1])).nombre : 'Usuario';

    const { abrirModal } = useContext(ModalContext); 

    return (
        <div className="flex flex-col items-center justify-center text-center p-8">
            <h1 className={`text-5xl font-extrabold mb-4 ${styles.text.primary}`}>
                ¡Bienvenido, <span className="text-indigo-500">{nombreUsuario}</span>!
            </h1>
            <p className={`text-xl mb-8 max-w-2xl ${styles.text.secondary}`}>
                Estás en tu panel personal para la gestión de citas. Aquí puedes organizar tu agenda, programar nuevos eventos y nunca olvidar una cita importante.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
                <Link 
                    to="/citas" 
                    className={`py-3 px-6 rounded-lg text-lg font-semibold transition-transform transform hover:scale-105 ${styles.button.primary}`}
                >
                    Ver Mis Citas
                </Link>
                {/* Este botón abrirá el modal en el futuro */}
                <button 
                    onClick={() => abrirModal()}
                    className={`py-3 px-6 rounded-lg text-lg font-semibold border-2 border-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors ${styles.text.primary}`}
                >
                    + Agendar Nueva Cita
                </button>
            </div>

            <div className="mt-16 p-6 rounded-lg border w-full max-w-4xl bg-slate-200/50 dark:bg-slate-800/50">
                <h3 className="text-2xl font-bold mb-4">¿Qué puedes hacer?</h3>
                <ul className="text-left space-y-2">
                    <li className="flex items-center gap-2">✅ <span className={styles.text.secondary}>Visualizar todas tus citas en un solo lugar.</span></li>
                    <li className="flex items-center gap-2">✅ <span className={styles.text.secondary}>Crear, editar y eliminar citas con facilidad.</span></li>
                    <li className="flex items-center gap-2">✅ <span className={styles.text.secondary}>(Próximamente) Recibir notificaciones para no olvidar tus compromisos.</span></li>
                </ul>
            </div>
        </div>
    );
}

export default WelcomePage;
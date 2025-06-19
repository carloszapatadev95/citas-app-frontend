import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { themeConfig } from '../theme/themeConfig';
import { ThemeContext } from '../context/ThemeContext';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const styles = themeConfig[theme];
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await login(email, password);
            navigate('/'); // Redirige a la página principal (citas) tras un login exitoso
        } catch (err) {
            setError('Credenciales inválidas. Por favor, verifica tu email y contraseña.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-start pt-20 min-h-screen">
            <div className={`w-full max-w-md p-8 rounded-lg shadow-2xl border ${styles.card}`}>
                <h2 className={`text-3xl font-bold text-center mb-6 ${styles.text.primary}`}>
                    Iniciar Sesión
                </h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className={`block mb-2 font-semibold ${styles.text.secondary}`}>Correo Electrónico</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500/50 ${styles.input}`}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className={`block mb-2 font-semibold ${styles.text.secondary}`}>Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-indigo-500/50 ${styles.input}`}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-colors ${styles.button.primary} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Ingresando...' : 'Ingresar'}
                    </button>
                </form>

                <p className={`text-center mt-6 ${styles.text.secondary}`}>
                    ¿No tienes una cuenta?{' '}
                    <Link to="/register" className="text-indigo-500 dark:text-indigo-400 hover:underline font-semibold">
                        Regístrate aquí
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;
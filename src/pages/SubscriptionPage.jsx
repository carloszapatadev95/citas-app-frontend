// Archivo: src/pages/SubscriptionPage.jsx
// Propósito: Mostrar planes y manejar la actualización a Pro en tiempo real.

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { themeConfig } from '../theme/themeConfig';

function SubscriptionPage() {
    // Obtenemos las funciones y datos necesarios del contexto
    const { apiClient, usuario, setAuthToken } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const styles = themeConfig[theme];
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        setLoading(true);
        try {
            // 1. Llamamos al endpoint del backend.
            const response = await apiClient.post('/billing/subscribe-pro');
            
            // 2. Comprobamos si el backend nos devolvió un nuevo token.
            if (response.data && response.data.token) {
                // 3. Usamos la función del contexto para actualizar la sesión.
                setAuthToken(response.data.token);
                toast.success('¡Suscripción Pro activada! Disfruta de todas las ventajas.');
                
                // 4. Redirigimos al usuario a la página de inicio después de un momento.
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                throw new Error("La respuesta del servidor no incluyó un nuevo token.");
            }

        } catch (error) {
            toast.error('No se pudo procesar la suscripción. Inténtalo de nuevo.');
            console.error('Error al suscribirse:', error);
            setLoading(false); // Volvemos a habilitar el botón si hay un error
        }
    };

    // La lógica para deshabilitar el botón ahora lee directamente de 'usuario.plan'
    const esPro = usuario?.plan === 'pro';
    const botonDeshabilitado = loading || esPro;

    return (
        <div className="container mx-auto py-8 px-4 text-center">
            <h1 className={`text-4xl md:text-5xl font-extrabold mb-4 ${styles.text.primary}`}>
                Elige tu Plan
            </h1>
            <p className={`text-lg mb-12 ${styles.text.secondary}`}>
                Desbloquea todo el potencial de tu gestor de citas con el plan Pro.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Tarjeta del Plan Free */}
                <div className={`p-8 rounded-xl border-2 ${styles.card}`}>
                    <h2 className="text-2xl font-bold">Plan Gratuito</h2>
                    <p className="text-5xl font-bold my-4">0€<span className="text-lg font-normal">/siempre</span></p>
                    <ul className="space-y-2 text-left mb-6">
                        <li>✅ Hasta 5 citas activas</li>
                        <li>✅ Recordatorios Push</li>
                        <li>❌ Recordatorios por Email</li>
                        <li>❌ Sincronización con Calendario</li>
                    </ul>
                </div>

                {/* Tarjeta del Plan Pro */}
                <div className={`p-8 rounded-xl border-2 border-indigo-500 relative ${styles.card}`}>
                    <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full font-semibold text-sm">MÁS POPULAR</div>
                    <h2 className="text-2xl font-bold text-indigo-500">Plan Pro</h2>
                    <p className="text-5xl font-bold my-4">10€<span className="text-lg font-normal">/año</span></p>
                    <ul className="space-y-2 text-left mb-6">
                        <li>✅ **Citas ilimitadas**</li>
                        <li>✅ Recordatorios Push</li>
                        <li>✅ **Recordatorios por Email**</li>
                        <li>✅ **Sincronización con Calendario (Próximamente)**</li>
                    </ul>
                    <button
                        onClick={handleSubscribe}
                        disabled={botonDeshabilitado}
                        className={`w-full py-3 rounded-lg font-semibold ${styles.button.primary} ${botonDeshabilitado ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Procesando...' : (esPro ? 'Ya eres Pro' : 'Hazte Pro')}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SubscriptionPage;
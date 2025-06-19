import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx';
import { themeConfig } from '../theme/themeConfig.js';

function AboutPage() {
    const { theme } = useContext(ThemeContext);
    const styles = themeConfig[theme];

    const techStack = [
        { name: 'React', description: 'Para una interfaz de usuario dinámica y reactiva.' },
        { name: 'Vite', description: 'Como herramienta de construcción ultrarrápida.' },
        { name: 'Tailwind CSS', description: 'Para un estilizado moderno y basado en utilidades.' },
        { name: 'Node.js & Express', description: 'Para construir nuestro robusto backend y API REST.' },
        { name: 'Sequelize', description: 'Como ORM para interactuar con la base de datos de forma segura.' },
        { name: 'MySQL', description: 'Como nuestra base de datos relacional.' },
        { name: 'JWT', description: 'Para una autenticación segura basada en tokens.' },
    ];

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-3xl mx-auto">
                <h1 className={`text-4xl md:text-5xl font-extrabold text-center mb-6 ${styles.text.primary}`}>
                    Acerca de <span className="text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors duration-200">Mi Gestor de Citas</span>
                </h1>

                <p className={`text-lg text-center mb-12 ${styles.text.secondary} leading-relaxed`}>
                    Esta aplicación es un proyecto full-stack diseñado para demostrar un ciclo de desarrollo completo, desde la idea hasta el despliegue en producción. Permite a los usuarios registrarse, iniciar sesión y gestionar sus citas personales de forma segura.
                </p>

                <div className={`p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 grid grid-cols-1 gap-8 ${styles.card} transition-all duration-300 hover:shadow-xl`}>
                    <div>
                        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Tecnologías Utilizadas</h2>
                        <ul className="space-y-4">
                            {techStack.map((tech) => (
                                <li key={tech.name} className="flex items-start group">
                                    <span className="
                                        text-green-500 dark:text-green-400 
                                        mr-3 mt-1 
                                        text-xl
                                        group-hover:scale-125
                                        transition-transform duration-200
                                    ">
                                        ✓
                                    </span>
                                    <div className="
                                        border-l-2 border-green-500 dark:border-green-400
                                        pl-3
                                        group-hover:border-indigo-500 dark:group-hover:border-indigo-400
                                        transition-colors duration-300
                                    ">
                                        <h3 className={`
                                            font-semibold 
                                            ${styles.text.primary}
                                            group-hover:text-indigo-600 dark:group-hover:text-indigo-400
                                            transition-colors duration-200
                                        `}>
                                            {tech.name}
                                        </h3>
                                        <p className={`
                                            ${styles.text.secondary}
                                            group-hover:text-gray-700 dark:group-hover:text-gray-300
                                            transition-colors duration-200
                                        `}>
                                            {tech.description}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* <div className="mt-8">
                        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">Información General</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Proyecto educativo desarrollado por{" "}
                            <span className="
                                relative inline-block
                                bg-gradient-to-r from-blue-500 to-purple-600
                                text-white font-medium
                                px-2 py-0.5 rounded-md
                                hover:shadow-lg hover:scale-[1.02]
                                transition-all duration-200
                                cursor-pointer
                            ">
                                SolteDev
                            </span>{" "}
                            para dominar React y desarrollo Full-Stack
                        </p>

                        <div className="space-y-3">
                            <div>
                                <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-1">Correo Electrónico</h4>
                                <a
                                    href="mailto:contacto@soltedev.com"
                                    className="
                                        text-indigo-600 dark:text-indigo-400 
                                        hover:text-indigo-800 dark:hover:text-indigo-300
                                        hover:underline 
                                        transition-colors duration-200
                                        inline-flex items-center
                                    "
                                >
                                    <span className="mr-1">✉️</span>
                                    contacto@soltedev.com
                                </a>
                            </div>

                             <div>
                                <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-1">Ubicación</h4>
                                <p className="text-gray-600 dark:text-gray-300 flex items-center">
                                    <span className="mr-1">📍</span>
                                    Planeta Tierra (Remoto)
                                </p>
                            </div> 
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default AboutPage;
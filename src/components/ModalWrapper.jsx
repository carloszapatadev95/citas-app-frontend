import ReactModal from 'react-modal';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx';
import { themeConfig } from '../theme/themeConfig.js'; // Importamos el themeConfig

function ModalWrapper({ isOpen, onRequestClose, title, children }) {
    const { theme } = useContext(ThemeContext);
    const styles = themeConfig[theme]; // Obtenemos los estilos del tema actual

    // Estilos en línea para la librería react-modal, usando nuestros valores del themeConfig
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: styles.modal.contentBg, // Usando valor del theme
            border: styles.modal.border,             // Usando valor del theme
            borderRadius: '0.75rem', // rounded-xl
            width: '90%',
            maxWidth: '550px',
            padding: '2rem',
            boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)'
        },
        overlay: {
            backgroundColor: 'rgba(17, 24, 39, 0.8)', // bg-gray-900 con opacidad
            zIndex: 1000
        }
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel={title}
            shouldCloseOnOverlayClick={true}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className={`text-2xl font-bold ${styles.text.primary}`}>{title}</h2>
                <button 
                    onClick={onRequestClose} 
                    className={`text-2xl font-bold p-1 rounded-full w-8 h-8 flex items-center justify-center ${styles.button.icon}`}
                    aria-label="Cerrar modal"
                >
                    x
                </button>
            </div>
            {children}
        </ReactModal>
    );
}

export default ModalWrapper;
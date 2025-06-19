// src/components/ModalWrapper.jsx
import ReactModal from 'react-modal';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx';

function ModalWrapper({ isOpen, onRequestClose, title, children }) {
    const { theme } = useContext(ThemeContext);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: theme === 'light' ? '#ffffff' : '#1f2937', // bg-white | bg-gray-800
            border: `1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'}`, // border-gray-200 | border-gray-700
            borderRadius: '0.5rem', // rounded-lg
            width: '90%',
            maxWidth: '500px',
            padding: '2rem'
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000
        }
    };

    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
            contentLabel={title}
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{title}</h2>
                <button onClick={onRequestClose} className="text-2xl font-bold text-gray-500 hover:text-gray-800 dark:hover:text-gray-300">
                    x
                </button>
            </div>
            {children}
        </ReactModal>
    );
}

export default ModalWrapper;
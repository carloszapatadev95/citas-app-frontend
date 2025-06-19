// src/context/ModalContext.jsx
import { createContext, useState } from 'react';

export const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [citaAEditar, setCitaAEditar] = useState(null);

    const abrirModal = (cita = null) => {
        setCitaAEditar(cita);
        setIsModalOpen(true);
    };

    const cerrarModal = () => {
        setIsModalOpen(false);
        setCitaAEditar(null);
    };

    const value = {
        isModalOpen,
        citaAEditar,
        abrirModal,
        cerrarModal,
    };

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
};
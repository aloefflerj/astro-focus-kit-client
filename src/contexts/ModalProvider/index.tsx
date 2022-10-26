import { createContext, useContext, useState } from 'react';
import { IModalContext } from './types';

export const ModalContext = createContext({} as IModalContext);

export const ModalProvider = ({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}) => {
    const [modal, setModal] = useState({ visible: false });

    const openModal = (payload: any) => setModal({ ...payload, visible: true });
    const closeModal = () => setModal({ visible: false });

    return (
        <ModalContext.Provider value={{ modal, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

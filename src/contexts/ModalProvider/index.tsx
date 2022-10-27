import { createContext, useContext, useState } from 'react';
import { IModalContext } from './types';

export const ModalContext = createContext({} as IModalContext);

export const ModalProvider = ({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}) => {
    const [modal, setModal] = useState({ visible: false, contextId: 'all' });

    const openModal = (payload: any, contextId: string) => {
        return setModal({ ...payload, visible: true, contextId: contextId });
    };
    
    const closeModal = (contextId: string = 'all') => setModal({ visible: false, contextId: contextId});

    return (
        <ModalContext.Provider value={{ modal, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

import { useContext } from "react";
import { ModalContext } from "../contexts/ModalProvider";

export const useModalContext = () => {
    const context = useContext(ModalContext);
    return context;
};
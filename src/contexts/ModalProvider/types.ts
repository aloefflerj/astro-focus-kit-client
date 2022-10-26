export interface IModalContext {
    openModal: (payload: any) => void;
    closeModal: () => void;
    modal: {
        visible: boolean;
    };
}
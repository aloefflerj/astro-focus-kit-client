export interface IModalContext {
    openModal: (payload: any, contextId: string) => void;
    closeModal: (contextId?: string) => void;
    modal: {
        visible: boolean;
        contextId?: string;
    };
}
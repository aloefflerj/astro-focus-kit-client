import { useModalContext } from '../../hooks/useModalContext';
import style from './Modal.module.scss';

export function Modal({
    children,
    modalId,
}: {
    children: React.ReactNode;
    modalId: string;
}): JSX.Element {
    const {
        modal: { visible, contextId },
        closeModal,
    } = useModalContext();

    return (
        <>
            <div
                className={` ${style.overlay} ${
                    visible && (modalId === contextId || contextId === 'all')
                        ? style.modalOpened
                        : style.modalClosed
                }`}
                onClick={() => closeModal(contextId)}
            ></div>
            <div
                className={`${
                    visible && (modalId === contextId || contextId === 'all')
                        ? style.modalOpened
                        : style.modalClosed
                } ${style.modal}`}
            >
                <div className='cardStyle'>
                    <span className='cardStyleTop'>{children}</span>
                </div>
            </div>
        </>
    );
}

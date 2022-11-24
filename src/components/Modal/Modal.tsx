import { useModalContext } from '../../hooks/useModalContext';
import style from './Modal.module.scss';

export function Modal({
    children,
    modalId,
    overlay = 'default',
    large = false,
}: {
    children: React.ReactNode;
    modalId: string;
    overlay?: 'default' | 'blockPageOverlay';
    large?: boolean;
}): JSX.Element {
    const {
        modal: { visible, contextId },
        closeModal,
    } = useModalContext();

    return (
        <>
            <div
                className={` ${
                    overlay === 'default'
                        ? style.overlay
                        : style.blockPageOverlay
                } ${
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
                } ${large ? style.modalLarge : style.modal}`}
            >
                <div className='cardStyle'>
                    <span className='cardStyleTop'>{children}</span>
                </div>
            </div>
        </>
    );
}

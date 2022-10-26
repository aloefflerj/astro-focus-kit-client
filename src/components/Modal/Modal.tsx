import { useModalContext } from '../../hooks/useModalContext';
import style from './Modal.module.scss';

export function Modal({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    const { modal: { visible }, closeModal } = useModalContext();

    return (
        <>
            <div
                className={` ${style.overlay} ${
                    visible ? style.modalOpened : style.modalClosed
                }`}
                onClick={closeModal}
            ></div>
            <div
                className={`${visible ? style.modalOpened : style.modalClosed} ${
                    style.modal
                }`}
            >
                <div className='cardStyle'>
                    <span className='cardStyleTop'>{children}</span>
                </div>
            </div>
        </>
    );
}

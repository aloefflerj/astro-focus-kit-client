import style from './Modal.module.scss';

export function Modal({
    children,
    opened = false,
    onClickOutside
}: {
    children: React.ReactNode;
    opened?: boolean;
    onClickOutside?: () => void;
}): JSX.Element {
    const onClickOutsideLocal = () => {
        if (onClickOutside)
            onClickOutside()
    }
    return (
        <>
        <div
            className={` ${style.overlay} ${
                opened ? style.modalOpened : style.modalClosed
            }`}
            onClick={onClickOutsideLocal}
        >
        </div>
        <div className={`${opened ? style.modalOpened : style.modalClosed} ${style.modal}`}>
            <div className={`cardStyle`}>
                <span className='cardStyleTop'>{children}</span>
            </div>
        </div>
        </>
    );
}

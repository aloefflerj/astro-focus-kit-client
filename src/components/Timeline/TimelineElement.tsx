import style from './TimelineElement.module.scss';
import star from '../../assets/img/star.svg';
import { MiniCard } from '../Card/MiniCard';
import { useModalContext } from '../../hooks/useModalContext';
import { Modal } from '../Modal/Modal';

export function TimelineElement({
    children,
    setShowDetails,
}: {
    children: JSX.Element | JSX.Element[] | string;
    setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { openModal } = useModalContext();
    return (
        <>
            <li className={style.timelineElement}>
                <div className={style.starImgWrapper}>
                    <img src={star} className={style.starImg} />
                </div>
                <div className={style.cardElement}>
                    <div
                        className='cardStyleHover'
                        onMouseEnter={() => setShowDetails(true)}
                        onMouseLeave={() => setShowDetails(false)}
                        onClick={e => openModal(e, 'history-details')}
                    >
                        <span className='cardStyleTop'>{children}</span>
                    </div>
                </div>
            </li>
            <Modal modalId='history-details'>Task History Modal</Modal>
        </>
    );
}

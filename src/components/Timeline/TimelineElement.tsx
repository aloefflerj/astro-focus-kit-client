import style from './TimelineElement.module.scss';
import star from '../../assets/img/star.svg';
import { MiniCard } from '../Card/MiniCard';
import { useModalContext } from '../../hooks/useModalContext';
import { Modal } from '../Modal/Modal';

export function TimelineElement({
    children,
    setElementVisibleByIndex,
    index
}: {
    children: JSX.Element | JSX.Element[] | string;
    setElementVisibleByIndex: React.Dispatch<React.SetStateAction<number | null>>;
    index: number;
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
                        onMouseEnter={() => setElementVisibleByIndex(index)}
                        onMouseLeave={() => setElementVisibleByIndex(null)}
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

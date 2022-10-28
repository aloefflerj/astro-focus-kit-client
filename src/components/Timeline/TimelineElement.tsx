import style from './TimelineElement.module.scss';
import star from '../../assets/img/star.svg';
import { MiniCard } from '../Card/MiniCard';

export function TimelineElement({
    children,
}: {
    children: JSX.Element | JSX.Element[] | string;
}) {
    return (
        <li className={style.timelineElement}>
            <div className={style.starImgWrapper}>
                <img src={star} className={style.starImg} />
            </div>
            <div className={style.cardElement}>
                <div className='cardStyle'>
                    <span className='cardStyleTop'>{children}</span>
                </div>
            </div>
        </li>
    );
}

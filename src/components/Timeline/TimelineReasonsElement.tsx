import style from './TimelineElement.module.scss';
import star from '../../assets/img/star.svg';
import { useModalContext } from '../../hooks/useModalContext';
import { Modal } from '../Modal/Modal';
import { IReason } from '../../common/types';
import { Card } from '../Card/Card';
import moment from 'moment';

export function TimelineReasonsElement({
    children,
    setElementVisibleByIndex,
    index,
    reasons,
}: {
    children: JSX.Element | JSX.Element[] | string;
    setElementVisibleByIndex: React.Dispatch<
        React.SetStateAction<string | null>
    >;
    index: string;
    reasons: IReason[];
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
                        onClick={e => openModal(e, `history-details-${index}`)}
                    >
                        <span className='cardStyleTop'>{children}</span>
                    </div>
                </div>
            </li>
            <Modal modalId={`history-details-${index}`} large>
                <h2 className={style.tasksStatusModalTitle}>Reasons You Procrastinate</h2>
                <div className={style.tasksStatusModalContent}>
                    <div className={style.tasksStatusModalElement}>
                        <div className={style.reasonsWrapper}>
                            {reasons.map((reason, index) => {
                                return (
                                    <span>
                                        {`${index}. ${
                                            reason.content
                                        } - ${moment(
                                            reason.reasonDateTime
                                        ).format('YYYY-MM-DD')}`}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

import style from './TimelineElement.module.scss';
import star from '../../assets/img/star.svg';
import { MiniCard } from '../Card/MiniCard';
import { useModalContext } from '../../hooks/useModalContext';
import { Modal } from '../Modal/Modal';
import { ITask } from '../../common/types';
import { Card } from '../Card/Card';

export function TimelineElement({
    children,
    setElementVisibleByIndex,
    index,
    finishedTasks,
    unfinishedTasks,
}: {
    children: JSX.Element | JSX.Element[] | string;
    setElementVisibleByIndex: React.Dispatch<
        React.SetStateAction<number | null>
    >;
    index: number;
    finishedTasks: ITask[];
    unfinishedTasks: ITask[];
}) {
    const { openModal } = useModalContext();

    const formatTasks = (tasks: ITask[]): JSX.Element[] => {
        return tasks.map(task => {
            return (
                <Card type='task' done={task.status === 'done'}>
                    <h4 className={style.tasksTitle}>{task.title}</h4>
                </Card>
            );
        });
    };

    const calcCompletePercentage = (): number => {
        if (finishedTasks.length === 0) return 0;
        const total = finishedTasks.length + unfinishedTasks.length;
        return parseFloat(((finishedTasks.length * 100) / total).toFixed(0));
    };

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
                <h2 className={style.tasksStatusModalTitle}>Week Tasks</h2>
                <div className={style.tasksStatusModalContent}>
                    <div className={style.tasksStatusModalElement}>
                        <h3>Finished {calcCompletePercentage()}%</h3>
                        <div className={style.tasksWrapper}>
                            {formatTasks(finishedTasks)}
                        </div>
                    </div>
                    <div className={style.tasksStatusModalElement}>
                        <h3>Unfinished</h3>
                        <div className={style.tasksWrapper}>
                            {formatTasks(unfinishedTasks)}
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

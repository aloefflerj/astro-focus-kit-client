import { Droppable } from '@hello-pangea/dnd';

import { Task } from '../Tasks/Task';
import { TaskList } from '../Tasks/TaskList';
import style from './Day.module.scss';
import { DayHeader } from './DayHeader';
import { ITask } from '../../common/types';
import { NewTaskButton } from '../../elements/Buttons/NewTaskButton';
import { Modal } from '../Modal/Modal';
import { TaskOptions } from '../Tasks/TaskOptions';
import { useModalContext } from '../../hooks/useModalContext';

interface Props {
    weekDay: string;
    monthDay: string;
    date: string;
    today: boolean;
    id: string;
    tasks: ITask[] | undefined;
    loading: boolean;
}

export function Day({
    weekDay,
    monthDay,
    date,
    today,
    tasks,
    id,
    loading,
}: Props) {
    const { openModal } = useModalContext();

    return (
        <div className={`${style.day} ${loading && style.loading}`} id='test'>
            <DayHeader weekDay={weekDay} monthDay={monthDay} today={today} />
            <Droppable droppableId={`${id}`}>
                {provided => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={style.droppableArea}
                    >
                        <TaskList>
                            {tasks?.map(task => (
                                <li key={task.id}>
                                    <Task
                                        key={task.id}
                                        index={task.order}
                                        id={`${task.id}`}
                                        title={task.title}
                                        status={task.status}
                                    />
                                </li>
                            ))}
                            {provided.placeholder}
                        </TaskList>
                    </div>
                )}
            </Droppable>
            <div className={style.dayButton} onClick={e => openModal(e, date)}>
                <NewTaskButton />
            </div>
            <Modal modalId={date}>
                <TaskOptions
                    taskRequest={{
                        order: tasks !== undefined ? tasks.length : 0,
                        registerDate: date
                    }}
                />
            </Modal>
        </div>
    );
}

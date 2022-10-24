import { Droppable } from '@hello-pangea/dnd';

import { Task } from '../Tasks/Task';
import { TaskList } from '../Tasks/TaskList';
import style from './Day.module.scss';
import { DayHeader } from './DayHeader';
import { ITask } from '../../common/types'; 
import { NewTaskButton } from '../../elements/Buttons/NewTaskButton';

interface Props {
  weekDay: string;
  monthDay: string;
  today: boolean;
  id: string;
  tasks: ITask[] | undefined;
  loading: boolean;
}

export function Day({ weekDay, monthDay, today, tasks, id, loading }: Props) {
  return (
    <div className={`${style.day} ${loading && style.loading}`}>
      <DayHeader weekDay={weekDay} monthDay={monthDay} today={today} />
      <Droppable droppableId={`${id}`}>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps} className={style.droppableArea}>
            <TaskList>
              {tasks?.map((task) => (
                <li key={task.id}>
                  <Task key={task.id} index={task.order} id={`${task.id}`} title={task.title}/>
                </li>
              ))}
              {provided.placeholder}
            </TaskList>
          </div>
        )}
      </Droppable>
      <div className={style.dayButton}>
        <NewTaskButton />
      </div>
    </div>
  );
}

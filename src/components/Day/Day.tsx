import { Droppable } from '@hello-pangea/dnd';
import { v4 as uuidv4 } from 'uuid';

import { Task } from '../Tasks/Task';
import { TaskList } from '../Tasks/TaskList';
import style from './Day.module.scss';
import { DayHeader } from './DayHeader';
import { ITask } from '../../common/types'; 

interface Props {
  weekDay: string;
  monthDay: string;
  today: boolean;
  id: string;
  tasks: ITask[] | undefined;
}

export function Day({ weekDay, monthDay, today, tasks, id }: Props) {
  return (
    <div className={style.day}>
      <DayHeader weekDay={weekDay} monthDay={monthDay} today={today} />
      <Droppable droppableId={`${id}`}>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <TaskList>
              {tasks?.map((task, index) => (
                <li key={task.id}>
                  <Task key={task.id} index={task.order} id={`${task.id}`} title={task.title}/>
                </li>
              ))}
              {provided.placeholder}
            </TaskList>
          </div>
        )}
      </Droppable>
    </div>
  );
}

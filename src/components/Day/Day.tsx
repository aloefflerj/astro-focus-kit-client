import { Task } from '../Tasks/Task';
import { TaskList } from '../Tasks/TaskList';
import style from './Day.module.scss';
import { DayHeader } from './DayHeader';

interface Props {
  title:
    | 'SUNDAY'
    | 'MONDAY'
    | 'THUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY';
  today: boolean;
}

export function Day({ title, today }: Props) {
  return (
    <div className={style.day}>
      <DayHeader title={title} today={today} />
      <TaskList>
        <li>
          <Task />
        </li>
        <li>
          <Task />
        </li>
        <li>
          <Task />
        </li>
        <li>
          <Task />
        </li>
      </TaskList>
    </div>
  );
}

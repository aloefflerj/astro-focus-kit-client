import style from './Day.module.scss';
import { DayTitle } from './DayTitle';

interface Props {
    title: 'SUNDAY' | 'MONDAY' | 'THUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY',
    today: boolean
}

export function Day({ title, today }: Props) {
  return (
    <div className={style.day}>
      <DayTitle title={title} today={today} />
    </div>
  );
}

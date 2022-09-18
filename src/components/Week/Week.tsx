import { Day } from '../Day/Day';
import style from './Week.module.scss';

export function Week() {
  return (
    <div className={style.week}>
      <Day title='SUNDAY' today={true} />
      <Day title='MONDAY' today={false} />
      <Day title='THUESDAY' today={false} />
      <Day title='WEDNESDAY' today={false} />
      <Day title='THURSDAY' today={false} />
      <Day title='FRIDAY' today={false} />
      <Day title='SATURDAY' today={false} />
    </div>
  );
}

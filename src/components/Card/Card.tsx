import style from './Card.module.scss';

interface Props {
  children: React.ReactNode;
  type: 'optionsCard' | 'taskCard' | 'logoCard' | 'weekDayCard' | 'imageOptionCard';
  active?: boolean
}

export function Card({ children, type, active }: Props) {
  return (
    <div className={style.card}>
      <span className={`${style.cardTop} ${style[type]} ${type} ${active === true ? 'active' : ''}`}>
        {children}
      </span>
    </div>
  );
}

import style from './Card.module.scss';

interface Props {
  children: React.ReactNode;
  type: 'optionsCard' | 'taskCard' | 'logoCard' | 'weekDayCard' | 'imageOptionCard';
}

export function Card({ children, type }: Props) {

  return (
    <div className={style.card}>
      <span className={`${style.cardTop} ${style[type]} ${type}`}>
        {children}
      </span>
    </div>
  );
}

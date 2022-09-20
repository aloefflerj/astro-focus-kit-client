import style from './Card.module.scss';

interface Props {
  children: React.ReactNode;
  type: 'logo' | 'planetOption' | 'option' | 'dayHeader' | 'task';
}

export function Card({ children, type }: Props) {
  return (
    <div className={`${style.card} ${style[type]}`}>
      <span className={`${style.cardTop} ${style[type]}`}>{children}</span>
    </div>
  );
}

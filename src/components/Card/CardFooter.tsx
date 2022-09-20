import style from './CardFooter.module.scss';

interface Props {
  children: React.ReactNode;
  type: 'task' | 'dayHeader'
}

export function CardFooter({ children, type }: Props) {
  return <div className={`${style.cardFooter} ${style[type]}`}>{children}</div>;
}

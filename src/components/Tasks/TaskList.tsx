import style from './TaskList.module.scss';

interface Props {
  children: React.ReactNode;
}

export function TaskList({ children }: Props) {
  return <ul className={style.taskList}>{children}</ul>;
}

import { Sidebar } from '../elements/Sidebar/Sidebar';
import style from '../App.module.scss';

interface Props {
  children: JSX.Element | JSX.Element[];
  sidebar?: boolean;
}

export const DashBoardStructure = ({ sidebar = true, children }: Props) => {
  return (
    <>
      {sidebar && <Sidebar />}
      <main className={style.main}>{children}</main>
    </>
  );
};

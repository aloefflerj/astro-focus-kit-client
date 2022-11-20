import { Sidebar } from '../elements/Sidebar/Sidebar';
import style from '../App.module.scss';
import { usePageLayout } from '../hooks/usePageLayout';

interface Props {
  children: JSX.Element | JSX.Element[];
  sidebar?: boolean;
}

export const DashboardLayoutPage = ({ sidebar = true, children }: Props) => {
  const { setLayout } = usePageLayout();
  // setLayout('dashboardLayout');

  return (
    <>
      {sidebar && <Sidebar />}
      <main className={style.main}>{children}</main>
    </>
  );
};

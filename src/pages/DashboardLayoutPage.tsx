import { Sidebar } from '../elements/Sidebar/Sidebar';
import style from '../App.module.scss';
import { usePageLayout } from '../hooks/usePageLayout';

interface Props {
  children: JSX.Element | JSX.Element[];
  sidebar?: boolean;
  loading?: boolean;
}

export const DashboardLayoutPage = ({ sidebar = true, loading = false, children }: Props) => {
  const { setLayout } = usePageLayout();
  setLayout('dashboardLayout');

  return (
    <>
      {sidebar && <Sidebar />}
      <main className={`${style.main} ${loading ? 'loading' : ''}`}>{children}</main>
    </>
  );
};

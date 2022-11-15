import style from '../App.module.scss';
import { usePageLayout } from '../hooks/usePageLayout';

export const CommonLayoutPage = ({children }: { children: JSX.Element | JSX.Element[]}) => {
  const { setLayout } = usePageLayout();
  setLayout('commonLayout');
  
  return (
      <main className={style.defaultMain}>{children}</main>
  );
};

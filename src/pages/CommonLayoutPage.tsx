import style from '../App.module.scss';

export const CommonLayoutPage = ({children }: { children: JSX.Element | JSX.Element[]}) => {
  return (
      <main className={style.defaultMain}>{children}</main>
  );
};

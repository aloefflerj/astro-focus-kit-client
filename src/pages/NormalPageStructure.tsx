import style from '../App.module.scss';

export const NormalPageStructure = ({children }: { children: JSX.Element | JSX.Element[]}) => {
  return (
      <main className={style.defaultMain}>{children}</main>
  );
};

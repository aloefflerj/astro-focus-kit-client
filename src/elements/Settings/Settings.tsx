import style from './Settings.module.scss';

export function Settings({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}) {
    return <nav className={style.settings}>{children}</nav>;
}

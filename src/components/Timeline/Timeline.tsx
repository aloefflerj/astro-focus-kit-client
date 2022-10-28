import style from './Timeline.module.scss';

export function Timeline({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}) {
    return (
        <div className={style.timeline}>
            <ul>{children}</ul>
        </div>
    );
}

import sytle from './CardHeader.module.scss';

export function CardHeader({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}) {
    return <span className={sytle.cardHeader}>{children}</span>;
}

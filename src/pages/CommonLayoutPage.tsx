import style from '../App.module.scss';
import { usePageLayout } from '../hooks/usePageLayout';

export const CommonLayoutPage = ({
    loading = false,
    children,
}: {
    loading?: boolean;
    children: JSX.Element | JSX.Element[];
}) => {
    const { setLayout } = usePageLayout();
    setLayout('commonLayout');

    return (
        <main className={`${style.defaultMain} ${loading ? 'loading' : ''}`}>
            {children}
        </main>
    );
};

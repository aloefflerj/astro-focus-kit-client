import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const WebLayout = ({ children }: { children: JSX.Element }) => {
    const auth = useAuth();

    if (auth.email) {
        return <Navigate to='/tasks' />;
    }

    return children;
};

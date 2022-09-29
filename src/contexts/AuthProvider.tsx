import { useEffect, useState } from 'react';
import { IUser } from '../common/types';
import { useApi } from '../hooks/useApi';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [render, setRender] = useState(false);
    const api = useApi();

    useEffect(() => {
        setRender(true);
    }, []);

    useEffect(() => {
        const validateToken = async () => {
            const storageData = localStorage.getItem('authToken');
            if (storageData) {
                const data = await api.validateToken(storageData);
                if (data) {
                    setUser(data);
                }
            }
        };
        if (render === true) {
            validateToken();
        }
    }, [render, api]);

    const signin = async (email: string, password: string) => {
        const data = await api.signin(email, password);
        if (data.user && data.token) {
            setUser(data.user);
            setToken(data.token);
            return true;
        }
        return false;
    };

    const signout = async () => {
        setUser(null);
        clearToken();
        await api.logout();
    };

    const setToken = (token: string) => {
        localStorage.setItem('authToken', token);
    };

    const clearToken = () => {
        localStorage.removeItem('authToken');
    };

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
};

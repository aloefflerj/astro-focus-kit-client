import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { NormalPageStructure } from './NormalPageStructure';

export const LoginPage = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMail(e.target.value);
    };

    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        if (mail && password) {
            const isLogged = await auth.signin(mail, password);
            if (isLogged) {
                navigate('/tasks');
            }
        }
    };

    return (
        <NormalPageStructure>
            <h1>Login</h1>
            <input
                type='text'
                value={mail}
                placeholder='Type your email'
                onChange={handleEmailInput}
            />
            <input
                type='password'
                value={password}
                placeholder='Type your password'
                onChange={handlePasswordInput}
            />
            <button onClick={handleLogin}>Login</button>
        </NormalPageStructure>
    );
};

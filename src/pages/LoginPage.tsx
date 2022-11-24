import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { CommonLayoutPage } from './CommonLayoutPage';
import { useNavigate } from 'react-router-dom';
import { Option } from '../elements/Sidebar/Option';
import star from '../assets/img/star.svg';
import { Card } from '../components/Card/Card';
import { useKeyDown } from '../hooks/useKeyDown';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const auth = useAuth();
    const navigate = useNavigate();

    const { handleOnEnter } = useKeyDown();

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        setLoading(true);
        try {
            await auth.authenticate(email, password);
            navigate('/tasks');
        } catch (error) {
            alert('Invalid email or password');
        }
        setLoading(false);
    };

    const handleLoadingState = () => (loading ? 'loading' : '');

    const style = {
        borderRadius: '4px',
        border: '2px solid #464651',
        padding: '8px 10px',
        fontFamily: 'Averia Libre, cursive',
        marginTop: '8px',
        color: '#464651',
        boxShadow: '0px -3px #464651',
        backgroundColor: '#f0c8ac',
        fontSize: '18px',
    };
    return (
        <CommonLayoutPage>
            <Card type='logoLogin'>
                <img src={star} alt='astro-focus-kit-logo' className={handleLoadingState()} />
                <h1 className={handleLoadingState()}>ASTRO FOCUS KIT</h1>
                <img src={star} alt='astro-focus-kit-logo' className={handleLoadingState()} />
            </Card>

            <p className={handleLoadingState()}>Launching productivity to the stars</p>

            <input
                style={style}
                type='text'
                value={email}
                placeholder='Type your email'
                onChange={handleEmailInput}
                onKeyDown={e => handleOnEnter(e, handleLogin)}
                className={handleLoadingState()}
            />
            <input
                style={style}
                type='password'
                value={password}
                placeholder='Type your password'
                onChange={handlePasswordInput}
                onKeyDown={e => handleOnEnter(e, handleLogin)}
                className={handleLoadingState()}
            />

            <button
                onClick={handleLogin}
                style={{
                    background: 'none',
                    border: 'none',
                    paddingTop: '12px',
                }}
                className={handleLoadingState()}
            >
                <Option type='small' title='LOGIN' />
            </button>
        </CommonLayoutPage>
    );
};

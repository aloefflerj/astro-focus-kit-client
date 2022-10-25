import React, { useContext, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { CommonLayoutPage } from './CommonLayoutPage';
import { useNavigate } from 'react-router-dom';
import { Option } from '../elements/Sidebar/Option';
import star from '../assets/img/star.svg';
import { Card } from '../components/Card/Card';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        try {
            await auth.authenticate(email, password);

            navigate('/tasks');
        } catch (error) {
            alert(
                'Invalid email or password, try: eve.holt@reqres.in and pass: cityslicka'
            );
        }
    };
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
                <img src={star} alt='astro-focus-kit-logo' />
                <h1>ASTRO FOCUS KIT</h1>
                <img src={star} alt='astro-focus-kit-logo' />
            </Card>
            <span style={{ marginTop: '16px', marginBottom: '8px' }}>
                Launching Productivity to the Stars
            </span>
            <input
                style={style}
                type='text'
                value={email}
                placeholder='Type your email'
                onChange={handleEmailInput}
            />
            <input
                style={style}
                type='password'
                value={password}
                placeholder='Type your password'
                onChange={handlePasswordInput}
            />

            <button
                onClick={handleLogin}
                style={{
                    background: 'none',
                    border: 'none',
                    paddingTop: '12px',
                }}
            >
                <Option type='small' title='LOGIN' />
            </button>
        </CommonLayoutPage>
    );
};

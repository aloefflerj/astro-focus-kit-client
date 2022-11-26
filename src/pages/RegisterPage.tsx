import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordValidator from 'password-validator';
import { useAuth } from '../hooks/useAuth';
import { CommonLayoutPage } from './CommonLayoutPage';
import { Option } from '../elements/Sidebar/Option';
import star from '../assets/img/star.svg';
import { Card } from '../components/Card/Card';
import { useKeyDown } from '../hooks/useKeyDown';

export const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [loading, setLoading] = useState(false);

    const auth = useAuth();
    const navigate = useNavigate();
    const { handleOnEnter } = useKeyDown();

    const handleLoadingState = () => (loading ? 'loading' : '');


    const validatePassword = (password: string, confirmation: string): {valid: boolean, msg: string} => {
        const schema = new PasswordValidator();
    
        schema
            .is().min(8)
            .is().max(100)
            .has().uppercase()
            .has().lowercase()
            .has().digits(2)
            .has().symbols()
            .has().not().spaces();
    
        if (password !== confirmation)
            return { valid: false, msg: 'Confirmation does not match password'};

        const rules =  schema.validate(password, { list: true })
        if (typeof rules !== 'boolean') {
            
            let msg = 'Unexpected errror';
            if (rules.length > 0) {
                switch(rules[0]) {
                    case 'min':
                        msg = 'Password must have at least 8 characteres';
                        break;
                    case 'uppercase':
                        msg = 'Password must have at least one uppercase letter';
                        break;
                    case 'lowercase':
                        msg = 'Password must have at least one lowercase letter';
                        break;
                    case 'digits':
                        msg = 'Password must have at least two digits';
                        break;
                    case 'spaces':
                        msg = 'Password shoul not have spaces';
                        break;
                    case 'symbols':
                        msg = 'Must have at leats one symbol';
                        break;
                }
            
                return { valid: false, msg: msg}
            }
        }
        return { valid: true, msg: 'Ok'};
    }

    const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    
    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    
    const handleConfirmationInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmation(e.target.value);
    };

    const handleRegister = async () => {
        setLoading(true);
        const { valid, msg } = validatePassword(password, confirmation);
        if (!valid) {
            alert(msg);
            return;
        }

        try {
            const response = await auth.register(name, email, password, confirmation);
            if (response.status === 201) {
                alert('usuário cadastrado com sucesso!');
            }

            navigate('/login');
        } catch (error) {
            alert((error as Error).message);
        } finally {
            setLoading(false)
        }
    };

    return (
        <CommonLayoutPage>
            <Card type='logoLogin'>
                <img src={star} alt='astro-focus-kit-logo' />
                <h1 className={handleLoadingState()}>ASTRO FOCUS KIT</h1>
                <img src={star} alt='astro-focus-kit-logo' />
            </Card>
            <p >Launching Productivity to the Stars</p>
            <input
                className={`${handleLoadingState()} input`}
                type='text'
                value={name}
                placeholder='What is your name?'
                onChange={handleNameInput}
                onKeyDown={e => handleOnEnter(e, handleRegister)}
            />
            <input
                className={`${handleLoadingState()} input`}
                type='text'
                value={email}
                placeholder='Type your email'
                onChange={handleEmailInput}
                onKeyDown={e => handleOnEnter(e, handleRegister)}
            />
            <input
                className={`${handleLoadingState()} input`}
                type='password'
                value={password}
                placeholder='Type your password'
                onChange={handlePasswordInput}
                onKeyDown={e => handleOnEnter(e, handleRegister)}
            />

            <input
                className={`${handleLoadingState()} input`}
                type='password'
                value={confirmation}
                placeholder='Type the confirmation'
                onChange={handleConfirmationInput}
                onKeyDown={e => handleOnEnter(e, handleRegister)}
            />

            <button
                onClick={handleRegister}
                className={handleLoadingState()}
            >
                <Option type='small' title='LOGIN' />
            </button>
        </CommonLayoutPage>
    );
};

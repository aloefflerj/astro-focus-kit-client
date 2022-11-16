import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/Card/Card';

import { Option } from '../../elements/Sidebar/Option';
import { api } from '../../services/api';
import { CommonLayoutPage } from '../CommonLayoutPage';
import style from './LandingPage.module.scss';
import char from '../../assets/img/char2.png';

interface IQuote {
    quote?: string;
    author?: string;
}

export function LandingPage() {
    const [quote, setQuote] = useState<IQuote>({
        quote: '',
        author: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        api.get('/quotes').then(({ data }) => setQuote(data));
    }, ['quote']);

    const redirectToHome = () => navigate('/');

    return (
        <CommonLayoutPage>
            <div className={`${style.landingPage} landingPage`}>
                <button className={style.goBackButton} onClick={redirectToHome}>
                    <Option title='«' />
                </button>
                <div className={style.emptyElementTop}></div>
                <div className={style.quoteWrapper}>
                    <Card type='default'>
                        <h2>{quote.quote}</h2>
                        <h4>{quote.author}</h4>
                    </Card>
                </div>
                <div className={style.emptyElementBottom}></div>
                <footer className={style.ground}>
                </footer>
                <div className={style.char}>
                    <img src={char} alt="char" />
                </div>
                <div className={style.bgAnimation}>
                    <div className={style.stars}></div>
                    <div className={style.stars2}></div>
                    <div className={style.stars3}></div>
                    <div className={style.stars4}></div>
                </div>
            </div>
        </CommonLayoutPage>
    );
}

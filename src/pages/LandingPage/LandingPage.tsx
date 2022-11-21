import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../../components/Card/Card';

import { Option } from '../../elements/Sidebar/Option';
import { api } from '../../services/api';
import { CommonLayoutPage } from '../CommonLayoutPage';
import style from './LandingPage.module.scss';
import char from '../../assets/img/wizard-landing-page.png';
import { Modal } from '../../components/Modal/Modal';
import { useModalContext } from '../../hooks/useModalContext';

interface IQuote {
    quote?: string;
    author?: string;
}

export function LandingPage({ block = false }: { block: boolean }) {
    const [quote, setQuote] = useState<IQuote>({
        quote: '',
        author: '',
    });

    const { site } = useParams();
    const navigate = useNavigate();

    const { openModal } = useModalContext();

    useEffect(() => {
        api.get('/quotes').then(({ data }) => setQuote(data));
    }, ['quote']);

    const redirectToHome = () => navigate('/');

    const renderMainLayout = () => {
        const siteBlockedMsg = (
            <>
                <h2>{site} blocked.</h2>
                <p>Do you want to go anyway?</p>
            </>
        );
        const emptyBlockedMsg = (
            <>
                <h2>Site blocked.</h2>
                <p>Do you want to go anyway?</p>
            </>
        );

        const blockLayout = (
            <>
                <div className={style.emptyElementTop}></div>
                <div className={style.emptyElementMiddle}></div>
                <div className={style.quoteWrapper}>
                    <Card type='default'>
                        {site ? siteBlockedMsg : emptyBlockedMsg}
                    </Card>
                </div>
                <div className={style.emptyElementMiddle}></div>
                <div className={style.buttonWrapper}>
                    <div className={style.shineOutline}>
                        <button onClick={() => redirectToHome()}>
                            <Option title='Go Back to Tasks' />
                        </button>
                    </div>
                    <div className={style.shineOutline}>
                        <button onClick={e => openModal(e, 'goAnyway')}>
                            <Option title='I Want to Go Anyway' />
                        </button>
                    </div>
                </div>
                <div className={style.emptyElementMiddle}></div>
                <div className={style.quoteWrapperBlocked}>
                    <p>{quote.quote}</p>
                    <small>{quote.author}</small>
                </div>
                <div className={style.emptyElementBottom}></div>
            </>
        );

        const simpleQuotesLayout = (
            <>
                <div className={style.emptyElementTop}></div>
                <div className={style.quoteWrapper}>
                    <Card type='default'>
                        <h2>{quote.quote}</h2>
                        <h4>{quote.author}</h4>
                    </Card>
                </div>
                <div className={style.emptyElementBottom}></div>
            </>
        );
        return block ? blockLayout : simpleQuotesLayout;
    };

    return (
        <CommonLayoutPage>
            <div className={`${style.landingPage} landingPage`}>
                <button className={style.goBackButton} onClick={redirectToHome}>
                    <Option title='«' />
                </button>
                {renderMainLayout()}
                <Modal modalId='goAnyway' overlay='blockPageOverlay'>
                    <div className={style.goAnywayModalContent}>
                        <h3>Why do you wanna go?</h3>
                        <textarea
                            className='input'
                            placeholder='why procrastinate? :('
                            rows={10}
                            name='description'
                            // value={}
                            // onChange={}
                        />
                        <button onClick={() => false}>
                            <Option type='small' title='GO' />
                        </button>
                    </div>
                </Modal>
                <footer className={style.ground}></footer>
                <div className={style.char}>
                    <img src={char} alt='char' />
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

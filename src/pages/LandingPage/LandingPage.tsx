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
import { IReason } from '../../common/types';
import moment from 'moment';
import { useSitesApi } from '../../services/sites/useSitesApi';
import { useReasonsApi } from '../../services/reasons/useReasonsApi';
import { useSessionsApi } from '../../services/sessions/useSessionsApi';

interface IQuote {
    quote?: string;
    author?: string;
}

export function LandingPage({ block = false }: { block: boolean }) {
    const [quote, setQuote] = useState<IQuote>({
        quote: '',
        author: '',
    });

    const { siteId } = useParams();
    const navigate = useNavigate();

    const { getSiteConfig } = useSitesApi();
    const { answerNewReason } = useReasonsApi();
    const { changeStatusToProcrastinating, changeStatusToFocusing } =
        useSessionsApi();

    const [site, setSite] = useState({
        url: 'Site',
        id: '',
    });

    const [currentReason, setCurrentReason] = useState<IReason>({
        content: '',
        reasonDateTime: moment().toISOString(),
        site: siteId === undefined ? '' : siteId,
    });

    const { openModal } = useModalContext();

    useEffect(() => {
        api.get('/quotes').then(({ data }) => setQuote(data));

        if (siteId === undefined) return;

        getSiteConfig(siteId).then(site => {
            setSite({ url: site.url, id: site.id });
        });
    }, ['quote', 'site']);

    const handleSiteUrl = (siteUrl: string): string => {
        if (!/^https?:\/\//i.test(siteUrl)) {
            siteUrl = 'http://' + siteUrl;
        }
        return siteUrl;
    };

    const redirectToHome = () => navigate('/');

    const goToTasks = async () => {
        const { status } = await changeStatusToFocusing();
        if (status === 204) navigate('/');
    };

    const redirectToSite = () =>
        (window.location.href = handleSiteUrl(site.url));

    const updateReasonContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentReason({ ...currentReason, content: e.target.value });
    };

    const registerNewReason = async () => {
        const { status } = await answerNewReason(currentReason);
        if (status === 201) {
            const { status: sessionStatus } =
                await changeStatusToProcrastinating();
            if (sessionStatus === 204) return redirectToSite();
        }
    };

    const renderMainLayout = () => {
        const siteBlockedMsg = (
            <>
                <h2>{site?.url} blocked.</h2>
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
                        <button onClick={() => goToTasks()}>
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
                        <h3>Why do You Want to Procrastinate?</h3>
                        <textarea
                            className='input'
                            placeholder='do you have any reason to go procrastinate?'
                            rows={10}
                            name='description'
                            value={currentReason.content}
                            onChange={updateReasonContent}
                        />
                        <button onClick={registerNewReason}>
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

import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Card } from '../../components/Card/Card';
import { MiniCard } from '../../components/Card/MiniCard';
import { Option } from '../Sidebar/Option';
import { Settings } from './Settings';

import style from './Settings.module.scss';

const mock = [
    {
        id: '123',
        url: 'yotube.com',
    },
    {
        id: '456',
        url: 'instagram.com',
    },
    {
        id: '456',
        url: 'instagram.com',
    },
    {
        id: '456',
        url: 'instagram.com',
    },
    {
        id: '456',
        url: 'instagram.com',
    },
    {
        id: '456',
        url: 'instagram.com',
    },
    {
        id: '456',
        url: 'instagram.com',
    },
];

export function SettingsBlock() {
    const basePath = '/settings';
    const navigate = useNavigate();
    return (
        <>
            <h1>Settings » Blocks</h1>
            <Settings>
                <button
                    className={style.goBackButton}
                    onClick={() => navigate(basePath)}
                >
                    <Option title='«' />
                </button>
                <div className={style.header}>
                    <div>
                        <Card type='default'>Websites that will be blocked</Card>
                    </div>
                </div>
                <div className={style.blockedSitesList}>
                    {mock.map(site => (
                        <div className={style.blockedSiteWrapper}>
                            <input
                                key={site.id}
                                type='text'
                                className='input'
                                placeholder='website to block'
                                value={site.url}
                            />
                            <div>
                                <MiniCard type='button' active={false}>
                                    -
                                </MiniCard>
                            </div>
                        </div>
                    ))}
                    <div className={style.blockedSiteWrapper}>
                        <input
                            type='text'
                            className='input'
                            placeholder='website to block'
                        />
                        <div>
                            <MiniCard type='button' active={false}>
                                +
                            </MiniCard>
                        </div>
                    </div>
                </div>
            </Settings>
        </>
    );
}

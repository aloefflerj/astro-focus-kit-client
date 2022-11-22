import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/Card/Card';
import { MiniCard } from '../../components/Card/MiniCard';
import { api } from '../../services/api';
import { useSitesApi } from '../../services/sites/useSitesApi';
import { Option } from '../Sidebar/Option';
import { Settings } from './Settings';

import style from './Settings.module.scss';

interface ISite {
    id: string;
    url: string;
}

export function SettingsBlock() {
    const basePath = '/settings';
    const navigate = useNavigate();

    const [sites, setSites] = useState<ISite[]>([]);
    const { getSitesConfig } = useSitesApi();

    const onSuccess = (queriedSites: ISite[]) => setSites(queriedSites);

    const { isFetching: isFetchingSites } = useQuery<ISite[]>(
        ['sites'],
        async () => getSitesConfig(),
        { onSuccess, refetchOnWindowFocus: false }
    );

    return (
        <div className={isFetchingSites ? 'loading' : ''}>
            <h1>Settings » Websites Block</h1>
            <Settings>
                <button
                    className={style.goBackButton}
                    onClick={() => navigate(basePath)}
                >
                    <Option title='«' />
                </button>
                <div className={style.header}>
                    <div>
                        <Card type='default'>
                            Websites that will be blocked
                        </Card>
                    </div>
                </div>
                <div className={style.blockedSitesList}>
                    {sites.map(site => (
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
        </div>
    );
}

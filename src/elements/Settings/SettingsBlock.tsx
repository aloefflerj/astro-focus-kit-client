import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '../../common/utils/queryClient';
import { Card } from '../../components/Card/Card';
import { MiniCard } from '../../components/Card/MiniCard';
import { useKeyDown } from '../../hooks/useKeyDown';
import { useSitesApi } from '../../services/sites/useSitesApi';
import { Option } from '../Sidebar/Option';
import { Settings } from './Settings';

import style from './Settings.module.scss';

export interface ISite {
    id: string;
    url: string;
}

export function SettingsBlock() {
    const basePath = '/settings';
    const navigate = useNavigate();
    const { handleOnEnter } = useKeyDown();

    const [sites, setSites] = useState<ISite[]>([]);
    const [newSite, setNewSite] = useState<string>('');

    const { getSitesConfig, createNewSiteConfig, removeSiteConfig } =
        useSitesApi();

    const onSuccess = (queriedSites: ISite[]) => setSites(queriedSites);

    const { isFetching: isFetchingSites } = useQuery<ISite[]>(
        ['sites'],
        async () => getSitesConfig(),
        { onSuccess, refetchOnWindowFocus: false }
    );

    const { mutate: addSiteMutation, isLoading: isLoadingSitesAfterAddition } =
        useMutation(
            (newSiteUrl: string) => {
                return createNewSiteConfig(newSiteUrl);
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries(['sites']);
                    setNewSite('');
                },
            }
        );

    const {
        mutate: removeSiteMutation,
        isLoading: isLoadingSitesAfterRemoval,
    } = useMutation(
        (site: ISite) => {
            return removeSiteConfig(site);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['sites']);
            },
        }
    );

    const handleNewSiteInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewSite(e.target.value);
    };

    return (
        <div
            className={
                isFetchingSites ||
                isLoadingSitesAfterAddition ||
                isLoadingSitesAfterRemoval
                    ? 'loading'
                    : ''
            }
        >
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
                            <div onClick={() => removeSiteMutation(site)}>
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
                            value={newSite}
                            onChange={handleNewSiteInput}
                            onKeyDown={e => handleOnEnter(e, () => addSiteMutation(newSite))}
                        />
                        <div onClick={() => addSiteMutation(newSite)}>
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

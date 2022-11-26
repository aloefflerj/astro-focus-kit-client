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
    const [actionButton, setActionButton] = useState<string>('delete');

    const {
        getSitesConfig,
        createNewSiteConfig,
        removeSiteConfig,
        updateSiteConfig,
    } = useSitesApi();

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
            return removeSiteConfig(site.id);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['sites']);
            },
        }
    );

    const { mutate: updateSiteMutation, isLoading: isLoadingSitesAfterUpdate } =
        useMutation(
            (site: ISite) => {
                return updateSiteConfig(site.id, site.url);
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

    const handleUpdateSiteInput = (
        e: React.ChangeEvent<HTMLInputElement>,
        siteId: string
    ) => {
        const updatedSites = sites.map(site => {
            if (site.id === siteId) {
                site.url = e.target.value;
                setActionButton(`update-${site.id}`);
            }
            return site;
        });

        setSites(updatedSites);
    };

    return (
        <div
            className={
                isFetchingSites ||
                isLoadingSitesAfterAddition ||
                isLoadingSitesAfterRemoval ||
                isLoadingSitesAfterUpdate
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
                        <div className={style.blockedSiteWrapper} key={site.id}>
                            <input
                                type='text'
                                className='input'
                                placeholder='website to block'
                                onChange={e =>
                                    handleUpdateSiteInput(e, site.id)
                                }
                                onKeyDown={e =>
                                    handleOnEnter(e, () =>
                                        actionButton === `update-${site.id}`
                                            ? updateSiteMutation(site) : ''
                                    )
                                }
                                value={site.url}
                            />
                            {actionButton === `update-${site.id}` ? (
                                <div onClick={() => updateSiteMutation(site)}>
                                    <MiniCard type='button' active={false}>
                                        +
                                    </MiniCard>
                                </div>
                            ) : (
                                <div onClick={() => removeSiteMutation(site)}>
                                    <MiniCard type='button' active={false}>
                                        -
                                    </MiniCard>
                                </div>
                            )}
                        </div>
                    ))}
                    <div className={style.blockedSiteWrapper}>
                        <input
                            type='text'
                            className='input'
                            placeholder='website to block'
                            value={newSite}
                            onChange={handleNewSiteInput}
                            onKeyDown={e =>
                                handleOnEnter(e, () => addSiteMutation(newSite))
                            }
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

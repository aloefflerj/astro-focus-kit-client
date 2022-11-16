import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/Card/Card';
import { MiniCard } from '../../components/Card/MiniCard';
import { api } from '../../services/api';
import { Option } from '../Sidebar/Option';
import { Settings } from './Settings';

import style from './Settings.module.scss';

interface IBlock {
    id: string;
    url: string;
}

export function SettingsBlock() {
    const basePath = '/settings';
    const navigate = useNavigate();

    const [blocks, setBlocks] = useState<IBlock[]>([]);

    useEffect(() => {
        api.get('/blocks').then(response => {
            setBlocks(response.data);
        });
    }, ['blocks']);

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
                        <Card type='default'>
                            Websites that will be blocked
                        </Card>
                    </div>
                </div>
                <div className={style.blockedSitesList}>
                    {blocks.map(site => (
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

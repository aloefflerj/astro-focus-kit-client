import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ITimer } from '../../common/types';
import { Card } from '../../components/Card/Card';
import { MiniCard } from '../../components/Card/MiniCard';
import { useKeyDown } from '../../hooks/useKeyDown';
import { useTimersApi } from '../../services/timers/useTimersApi';
import { Option } from '../Sidebar/Option';
import { Settings } from './Settings';

import style from './Settings.module.scss';

export function SettingsTimer() {
    const navigate = useNavigate();
    const basePath = '/settings';
    const [loading, setLoading] = useState(false);
    const [successfullUpdate, setSuccessfullUpdate] = useState('');
    const [timer, setTimer] = useState<ITimer>({ id: '', time: 0 });
    const { getTimer, updateTimer } = useTimersApi();
    const { handleOnEnter } = useKeyDown();

    const handleTimerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTimer({
            id: timer.id,
            time: e.target.valueAsNumber,
        });
    };

    useEffect(() => {
        setLoading(true);
        getTimer()
            .then(({ data }) => {
                setTimer(data);
            })
            .catch(error => {
                alert(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, ['timer']);

    const updateProcrastinationTimer = async (newTimeValue: number) => {
        setLoading(true);
        const { status } = await updateTimer(timer.id, newTimeValue);
        if (status !== 204) {
            alert('Could not update timer');
            setLoading(false);
            return;
        }

        setTimer({
            ...timer,
            time: newTimeValue,
        });
        setLoading(false);
        updateMessage();
    };

    const updateMessage = () => {
        setSuccessfullUpdate('Successfully updated time');
        setTimeout(() => {
            setSuccessfullUpdate('');
        }, 3000);
    };

    return (
        <div className={loading ? 'loading' : ''}>
            <h1>Settings » Procrastination Timer</h1>
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
                            Procrastination session timer
                        </Card>
                    </div>
                </div>
                <div className={style.timersContent}>
                    <div className={style.timersList}>
                        <div className={style.timersWrapper}>
                            <div className={style.timerInputWrapper}>
                                <label htmlFor='procrastinationTimer'>
                                    How many minutes do you want your
                                    procrastination timer to be?
                                </label>
                                <input
                                    name='procrastinationTimer'
                                    type='number'
                                    className='input'
                                    placeholder='how many minutes?'
                                    value={timer.time}
                                    onChange={handleTimerInput}
                                    max={59}
                                    min={1}
                                    onKeyDown={e =>
                                        handleOnEnter(e, () =>
                                            updateProcrastinationTimer(
                                                timer.time
                                            )
                                        )
                                    }
                                />
                            </div>
                            <div
                                onClick={() =>
                                    updateProcrastinationTimer(timer.time)
                                }
                            >
                                <MiniCard type='button' active={false}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </MiniCard>
                            </div>
                        </div>
                    </div>
                    {successfullUpdate ? <p>Successfuly updated!</p> : null}
                </div>
            </Settings>
        </div>
    );
}

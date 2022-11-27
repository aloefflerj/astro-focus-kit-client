import { Link } from 'react-router-dom';
import { Option } from '../Sidebar/Option';
import { Settings } from './Settings';
import style from './SettingsMain.module.scss';

export function SettingsMain() {
    const basePath = '/settings';

    return (
        <>
            <h1>Settings</h1>
            <Settings>
                <div className={style.settingsMain}>
                    <div className={style.settingsMainContent}>
                        <Link to={`${basePath}/blocked-sites`}>
                            <Option title='Websites Block' />
                        </Link>
                        <Link to={`${basePath}/timer`}>
                            <Option title='Procrastination Timer' />
                        </Link>
                    </div>
                </div>
            </Settings>
        </>
    );
}

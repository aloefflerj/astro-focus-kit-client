import { Link } from 'react-router-dom';
import { Option } from '../Sidebar/Option';
import { Settings } from './Settings';

export function SettingsMain() {
    const basePath = '/settings';

    return (
        <>
            <h1>Settings</h1>
            <Settings>
                <Link to={`${basePath}/blocked-sites`}>
                    <Option title='Websites Block' />
                </Link>
                <Link to={`${basePath}/timer`}>
                    <Option title='Procrastination Timer' />
                </Link>
            </Settings>
        </>
    );
}

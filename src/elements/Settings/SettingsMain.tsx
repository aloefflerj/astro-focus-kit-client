import { Link, Outlet } from 'react-router-dom';
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
            </Settings>
        </>
    );
}

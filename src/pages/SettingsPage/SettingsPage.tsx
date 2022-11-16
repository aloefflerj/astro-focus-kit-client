import { Link, Outlet } from 'react-router-dom';
import { SettingsMain } from '../../elements/Settings/SettingsMain';
import { Option } from '../../elements/Sidebar/Option';
import { DashboardLayoutPage } from '../DashboardLayoutPage';

import style from './SettingsPage.module.scss';

export function SettingsPage() {
    return (
        <DashboardLayoutPage>
            <div className={style.settingsPage}>
                <Outlet />
            </div>
        </DashboardLayoutPage>
    );
}

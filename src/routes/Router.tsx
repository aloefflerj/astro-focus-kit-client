import { Routes, Route, Navigate } from 'react-router-dom';
import { WebLayout } from '../components/ProtectedLayout/WebLayout';
import { ProtectedLayout } from '../components/ProtectedLayout/ProtectedLayout';
import { SettingsBlock } from '../elements/Settings/SettingsBlock';
import { SettingsMain } from '../elements/Settings/SettingsMain';
import { DashboardLayoutPage } from '../pages/DashboardLayoutPage';
import { JournalPage } from '../pages/JournalPage/JournalPage';
import { LandingPage } from '../pages/LandingPage/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { MetricsPage } from '../pages/Metrics/MetricsPage';
import { RegisterPage } from '../pages/RegisterPage';
import { SettingsPage } from '../pages/SettingsPage/SettingsPage';
import { TasksPage } from '../pages/TasksPage';
import { SettingsTimer } from '../elements/Settings/SettingsTimer';

export function Router() {
    return (
        <Routes>
            <Route path='/'>
                <Route path='' element={<Navigate to='/tasks' />} />
                <Route
                    path='login'
                    element={
                        <WebLayout>
                            <LoginPage />
                        </WebLayout>
                    }
                />
                <Route
                    path='register'
                    element={
                        <WebLayout>
                            <RegisterPage />
                        </WebLayout>
                    }
                />
                <Route
                    path='tasks'
                    element={
                        <ProtectedLayout>
                            <TasksPage />
                        </ProtectedLayout>
                    }
                />
                <Route path='quotes' element={<LandingPage block={false} />} />
                <Route path='block'>
                    <Route path=''
                        element={
                            <ProtectedLayout>
                                <LandingPage block={true} />
                            </ProtectedLayout>
                        }
                    />
                    <Route path=':siteId'
                        element={
                            <ProtectedLayout>
                                <LandingPage block={true} />
                            </ProtectedLayout>
                        }
                    />
                </Route>

                <Route
                    path='journal'
                    element={
                        <ProtectedLayout>
                            <JournalPage />
                        </ProtectedLayout>
                    }
                />
                <Route
                    path='metrics'
                    element={
                        <ProtectedLayout>
                            <MetricsPage />
                        </ProtectedLayout>
                    }
                />
                <Route
                    path='settings'
                    element={
                        <ProtectedLayout>
                            <SettingsPage />
                        </ProtectedLayout>
                    }
                >
                    <Route path='' element={<SettingsMain />} />
                    <Route path='blocked-sites' element={<SettingsBlock />} />
                    <Route path='timer' element={<SettingsTimer />} />
                </Route>
                <Route
                    path='note'
                    element={
                        <ProtectedLayout>
                            <DashboardLayoutPage>
                                <h1>note</h1>
                            </DashboardLayoutPage>
                        </ProtectedLayout>
                    }
                />
                <Route path='*' element={<h1>not found</h1>} />
            </Route>
        </Routes>
    );
}

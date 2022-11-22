import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthenticatedLayout } from '../components/ProtectedLayout/AuthenticatedLayout';
import { ProtectedLayout } from '../components/ProtectedLayout/ProtectedLayout';
import { SettingsBlock } from '../elements/Settings/SettingsBlock';
import { SettingsMain } from '../elements/Settings/SettingsMain';
import { DashboardLayoutPage } from '../pages/DashboardLayoutPage';
import { JournalPage } from '../pages/JournalPage';
import { LandingPage } from '../pages/LandingPage/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { SettingsPage } from '../pages/SettingsPage/SettingsPage';
import { TasksPage } from '../pages/TasksPage';

export function Router() {
    return (
        <Routes>
            <Route path='/'>
                <Route path='' element={<Navigate to='/tasks' />} />
                <Route
                    path='login'
                    element={
                        <AuthenticatedLayout>
                            <LoginPage />
                        </AuthenticatedLayout>
                    }
                />
                <Route
                    path='register'
                    element={
                        <ProtectedLayout>
                            <RegisterPage />
                        </ProtectedLayout>
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
                    <Route path=':site'
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
                            <DashboardLayoutPage>
                                <h1>metrics</h1>
                            </DashboardLayoutPage>
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

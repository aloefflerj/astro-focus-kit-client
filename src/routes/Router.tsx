import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthenticatedLayout } from '../components/ProtectedLayout/AuthenticatedLayout';
import { ProtectedLayout } from '../components/ProtectedLayout/ProtectedLayout';
import { DashboardLayoutPage } from '../pages/DashboardLayoutPage';
import { JournalPage } from '../pages/JournalPage';
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { TasksPage } from '../pages/TasksPage';

export function Router() {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/tasks' />} />
            <Route 
                path='/login' 
                element={
                    <AuthenticatedLayout>
                        <LoginPage />
                    </AuthenticatedLayout>
                } />
            <Route 
                path='/register' 
                element={
                    <ProtectedLayout>
                        <RegisterPage />
                    </ProtectedLayout>
                } />
            <Route
                path='/tasks'
                element={
                    <ProtectedLayout>
                        <TasksPage />
                    </ProtectedLayout>
                }
            />
            <Route
                path='/landing'
                element={
                    <ProtectedLayout>
                        <LandingPage />
                    </ProtectedLayout>
                }
            />
            <Route
                path='/journal'
                element={
                    <ProtectedLayout>
                        <JournalPage />
                    </ProtectedLayout>
                }
            />
            <Route
                path='/metrics'
                element={
                    <ProtectedLayout>
                        <DashboardLayoutPage>
                            <h1>metrics</h1>
                        </DashboardLayoutPage>
                    </ProtectedLayout>
                }
            />
            <Route
                path='/settings'
                element={
                    <ProtectedLayout>
                        <DashboardLayoutPage>
                            <h1>settings</h1>
                        </DashboardLayoutPage>
                    </ProtectedLayout>
                }
            />
            <Route
                path='/note'
                element={
                    <ProtectedLayout>
                        <DashboardLayoutPage>
                            <h1>note</h1>
                        </DashboardLayoutPage>
                    </ProtectedLayout>
                }
            />
            <Route path='*' element={<h1>not found</h1>} />
        </Routes>
    );
}

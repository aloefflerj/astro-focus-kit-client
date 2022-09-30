import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedLayout } from '../components/ProtectedLayout/ProtectedLayout';
import { LoginPage } from '../pages/LoginPage';
import { TasksPage } from '../pages/TasksPage';

export function Router() {
  
  return (
      <Routes>
        <Route path='/' element={<Navigate to='/tasks' />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<h1>register</h1>} />
        <Route path='/tasks' element={<ProtectedLayout><TasksPage /></ProtectedLayout>} />
        <Route path='/planet' element={<ProtectedLayout><h1>planet</h1></ProtectedLayout>} />
        <Route path='/journal' element={<h1>journal</h1>} />
        <Route path='/settings' element={<h1>settings</h1>} />
        <Route path='/view' element={<h1>view</h1>} />
        <Route path='/note' element={<h1>note</h1>} />
        <Route path="*" element={<h1>not found</h1>} />
      </Routes>
  );
}

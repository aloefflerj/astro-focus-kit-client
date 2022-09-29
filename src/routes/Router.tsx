import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { RequireAuth } from '../contexts/RequireAuth';
import { LoginPage } from '../pages/LoginPage';
import { TasksPage } from '../pages/TasksPage';

export function Router() {
  const auth = useContext(AuthContext);
  
  return (
    <Routes>
      <Route path='/' element={<RequireAuth><TasksPage /></RequireAuth>} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<h1>register</h1>} />
      <Route path='/tasks' element={<RequireAuth><TasksPage /></RequireAuth>} />
      <Route path='/planet' element={<h1>planet</h1>} />
      <Route path='/journal' element={<h1>journal</h1>} />
      <Route path='/settings' element={<h1>settings</h1>} />
      <Route path='/view' element={<h1>view</h1>} />
      <Route path='/note' element={<h1>note</h1>} />
      <Route path="*" element={<h1>not found</h1>} />
    </Routes>
  );
}

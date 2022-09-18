import { Routes, Route, Outlet, Link } from 'react-router-dom';

export function Router() {
  return (
    <Routes>
      <Route path='/' element={<h1>home</h1>} />
      <Route path='/login' element={<h1>login</h1>} />
      <Route path='/register' element={<h1>register</h1>} />
      <Route path='/tasks' element={<h1>tasks</h1>} />
      <Route path='/planet' element={<h1>planet</h1>} />
      <Route path='/journal' element={<h1>journal</h1>} />
      <Route path='/settings' element={<h1>settings</h1>} />
      <Route path='/note' element={<h1>note</h1>} />
      <Route path="*" element={<h1>not found</h1>} />
    </Routes>
  );
}

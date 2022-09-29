import style from './App.module.scss';
import { Router } from './routes/Router';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';

type User = {
  id: number;
  username: string;
  mail: string;
};

function App() {
  const auth = useContext(AuthContext);
  return (
    <div className={auth.user ? style.app : style.defaultLayout}>
      <Router />
    </div>
  );
}

export default App;

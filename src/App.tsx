import style from './App.module.scss';
import { Router } from './routes/Router';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthProvider';

function App() {
    const auth = useContext(AuthContext);
    return (
        <div className={auth.email ? style.app : style.defaultLayout}>
            <Router />
        </div>
    );
}

export default App;

import style from './App.module.scss';
import { Router } from './routes/Router';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthProvider';
import * as moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-br')

function App() {
    const auth = useContext(AuthContext);
    return (
        <div className={auth.email ? style.app : style.defaultLayout}>
            <Router />
        </div>
    );
}

export default App;

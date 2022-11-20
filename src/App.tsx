import style from './App.module.scss';
import { Router } from './routes/Router';
import * as moment from 'moment';
// import 'moment/locale/pt-br';
import { usePageLayout } from './hooks/usePageLayout';
// moment.locale('pt-br')

function App() {
    const { layout } = usePageLayout();
    return (
        <div className={layout === 'commonLayout' ? style.defaultLayout : style.app}>
            <Router />
        </div>
    );
}

export default App;

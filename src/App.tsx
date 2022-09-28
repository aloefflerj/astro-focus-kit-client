import { EnvironmentConfig } from './config/environmentConfig';

import style from './App.module.scss'
import { Router } from './routes/Router';
import { Sidebar } from './elements/Sidebar/Sidebar';

const basePath = EnvironmentConfig.mainServerApiBasePath;

type User = {
  id: number;
  username: string;
  mail: string;
};

function App() {
  return (
    <div className={false ? style.retracted : style.app}>
      <Sidebar />
      <main className={style.main}>
        <Router />
      </main>
    </div>
  );
}

export default App;

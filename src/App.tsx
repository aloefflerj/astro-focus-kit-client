import { useQuery } from '@tanstack/react-query';
import { User } from './components/User';
import axios from 'axios';
import { EnvironmentConfig } from './config/environmentConfig';

import './App.css';
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
  // const { data, isFetching } = useQuery<User[]>(['users'], async () => {
  //   const response = await axios.get(`${basePath}/users`)

  //   console.log(response.data)
  //   return response.data
  // })

  // return (
  //   <ul>
  //     {isFetching && <p>Carregando...</p>}
  //     {data?.map((user, index) => {
  //       return (
  //         <User
  //           key={index}
  //           id={user.id}
  //           name={user.username}
  //           mail={user.mail}
  //         />
  //       )
  //     })}
  //   </ul>
  // )
}

export default App;

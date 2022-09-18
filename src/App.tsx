import { useQuery } from '@tanstack/react-query';
import { User } from './components/User';
import axios from 'axios';
import { EnvironmentConfig } from './config/environmentConfig';
import { Link } from 'react-router-dom'

import { Router } from './routes/Router'

const basePath = EnvironmentConfig.mainServerApiBasePath;

type User = {
  id: number;
  username: string;
  mail: string;
};

function App() {
  return (
    <>
      <aside>
        <ul>
          <li><Link to='/'>home</Link></li>
          <li><Link to='/login'>login</Link></li>
          <li><Link to='/register'>register</Link></li>
          <li><Link to='/tasks'>tasks</Link></li>
          <li><Link to='/planet'>planet</Link></li>
          <li><Link to='/journal'>journal</Link></li>
          <li><Link to='/settings'>settings</Link></li>
          <li><Link to='/note'>note</Link></li>
        </ul>
      </aside>
      <main>
        <Router />
      </main>
    </>
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

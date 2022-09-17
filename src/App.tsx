import { useQuery } from '@tanstack/react-query'
import { User } from './components/User'
import axios from 'axios'
import { EnvironmentConfig } from './config/environmentConfig'

const basePath = EnvironmentConfig.mainServerApiBasePath

type User = {
  id: number
  username: string
  mail: string
}

function App() {
  const { data, isFetching } = useQuery<User[]>(['users'], async () => {
    const response = await axios.get(`${basePath}/users`)

    console.log(response.data)
    return response.data
  })

  return (
    <ul>
      {isFetching && <p>Carregando...</p>}
      {data?.map((user, index) => {
        return (
          <User
            key={index}
            id={user.id}
            name={user.username}
            mail={user.mail}
          />
        )
      })}
    </ul>
  )
}

export default App
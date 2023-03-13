import { useEffect, useState } from "react"
import { api } from "../api/api"

export const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [iseError, setIsError] = useState(false)

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = async () => {

    try {

      setIsLoading(true)
      const users = await api.getUsers();
      setUserList(users)
      setIsLoading(false)
    } catch (error) {

      setIsError(false)
    } finally {

      setIsLoading(false)
    }
  }

  const onClickEdit = () => {

  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginLeft: '20px' }}>
      <h1>Lista de Usuáros</h1>

      {isLoading && <h2>Carregando...</h2>}

      {iseError && <h2>Ocorreu algum problema :( </h2>}

      {userList.map((user, index) => (
        <div key={index} style={{ display: 'flex' }}>
          <img src={user.avatar} />
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
            <h2>Id: {user.id}</h2>
            <h3>nome: {user.name}</h3>
          </div>
        </div>
      ))}
    </div>
  )
}
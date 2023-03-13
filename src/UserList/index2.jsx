import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { api } from "../api/api"
import { useForm } from "react-hook-form";

export const UserList = () => {
  const [selectedUser, setSelectedUser] = useState();
  const [name, seName] = useState(false);
  const [page, setPage] = useState(1);
  const { register, getValues, setValue, handleSubmit, watch, formState: { errors } } = useForm();

  // const onSubmit = _ => {
  //   console.log("selectedUser: ", selectedUser.id)
  //   console.log("getValues", getValues('name'));
  // };

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(
    ['user-list', page],
    () => api.getUsers(page),
    {
      keepPreviousData: true, // mantem os dados anteriores até que os novos dados sejam obtidos 
      staleTime: 2000,  // aguarda esse tempo para fazer uma novo fetch na api
      // enabled: false
    }
  )

  const { isLoading: loadingMutation, mutate } = useMutation(
    () => api.updateUsersName(selectedUser.id, getValues('name'),),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('user-list')
        setSelectedUser(null)
      }
    }
  );

  // console.log("data: ", data);   
  // console.log(watch("example"));
  // console.log("getValues(): ", getValues('name'))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginLeft: '20px' }}>
      <h1>Lista de Usuáros</h1>

      {selectedUser &&
        (
          <form onSubmit={handleSubmit(mutate)}>
            <input
              {...register(
                "name",
                {
                  onChange: (e) => setValue('name', e.target.value)
                }
              )}
              type="text"
              placeholder="digite um nome"
            // value={getValues("name")}
            />
            <input type='submit' value="enviar" />
            <button onClick={() => setSelectedUser(null)}> fechar </button>
          </form>
        )}


      {isLoading && <h2>Carregando...</h2>}

      {isError && <h2>Ocorreu algum problema :( </h2>}

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Página anterior
        </button>
        <p>Página Atual: {page} </p>
        <button
          type="button"
          onClick={() => setPage(prev => prev + 1)}
          disabled={page == 5}
        >
          Próxima página
        </button>
      </div>

      {data?.map((user, index) => (
        <div
          key={index}
          style={{ display: 'flex', cursor: 'pointer' }}
          onClick={() => {
            setValue('name', user.name)
            setSelectedUser(user)
          }}
        >
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
import axios from 'axios';
const URL = 'https://640e2398b07afc3b0dc04bda.mockapi.io/';

const getUsers = async (page) => {

  // simular delay na rede:
  // await new Promise((resolve) => setTimeout(resolve, 1500));

  const response = await axios.get(`${URL}users?page=${page}`);

  return response.data;
}

const updateUsersName = async (useId, name) => {
  const response = await axios.put(`${URL}users/${useId}`, { name });
}

export const api = {
  getUsers,
  updateUsersName,
}
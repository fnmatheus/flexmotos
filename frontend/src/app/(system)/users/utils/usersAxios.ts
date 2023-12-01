import { instance } from '../../utils/axios';
import { IAddUser, IUsers } from '../../utils/interfaces';
import { backendURL } from '../../utils/urls';

export const getUsers = async () => {
  const {data}: {data: IUsers[]} = await instance.get(`${backendURL}/users`);
  const users: string[][] = data.map((user) => {
    const lastTime = new Date(user.lastTime).toLocaleDateString('en-GB');
    return ([String(user.code), user.name, user.category, lastTime]);
  });
  return users;
}

export const removeUser = async (name: string) => {
  await instance.delete(`${backendURL}/users/remove`, {
    params: {
      name
    }
  });
  const newUsers = await getUsers();
  return newUsers;
}

export const filterUsersByCategory = async (category: string) => {
  const getUrl = (category !== '') ? `${backendURL}/users/category/${category}` :  `${backendURL}/users`;
  const {data}: {data: IUsers[]} = await instance.get(getUrl);
  const users: string[][] = data.map((user) => {
    const lastTime = new Date(user.lastTime).toLocaleDateString('en-GB');
    return ([String(user.code), user.name, user.category, lastTime]);
  });
  return users;
}

export const addUser = async (payload: IAddUser) => {
  try {
    await instance.post(`${backendURL}/users/signup`, payload);
    const newUsers = await getUsers();
    return newUsers;
  } catch (error) {
    return null;
  }
}

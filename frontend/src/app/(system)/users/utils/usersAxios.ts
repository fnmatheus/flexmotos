import { instance } from '../../utils/axios';
import { IUser, IUsers } from '../../utils/interfaces';
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
  try {
    await instance.delete(`${backendURL}/users/remove`, {
      params: {
        name
      }
    });
    const newUsers = await getUsers();
    return newUsers;
  } catch (error) {
    return null;
  }
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

export const getUserByName = async (name: string) => {
  const {data}: {data: IUser[]} = await instance.get(`${backendURL}/users/name/${name}`);
  const user = [data[0].name, data[0].category];
  return user;
}

export const addUser = async (payload: IUser) => {
  try {
    await instance.post(`${backendURL}/users/signup`, payload);
    const newUsers = await getUsers();
    return newUsers;
  } catch (error) {
    return null;
  }
}

export const updateUser =async (payload: IUser) => {
  try {
    await instance.post(`${backendURL}/users/update`, payload);
    const newUsers = await getUsers();
    return newUsers;
  } catch (error) {
    return null;
  }
}

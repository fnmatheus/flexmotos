import { instance } from '../../utils/axios';
import { IUsers } from '../../utils/interfaces';
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
}

import axios from 'axios';

export const instance = axios.create();

export function setAxiosToken(token: string) {
  instance.defaults.headers.common['authorization'] = token;
}

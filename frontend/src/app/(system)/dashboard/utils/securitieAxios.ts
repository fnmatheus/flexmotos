import { instance } from '../../utils/axios';
import { backendURL } from '../../utils/urls';
import { ISecuritie } from '../../utils/interfaces';

export const getSecurities = async () => {
  const {data}: {data: ISecuritie[]} = await instance.get(`${backendURL}/clients/securities`);
  return data;
}

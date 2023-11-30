import { instance } from '../../utils/axios';
import { backendURL } from '../../utils/urls';
import { ISecuritie } from '../../utils/interfaces';

export const getSecurities = async () => {
  const {data}: {data: ISecuritie[]} = await instance.get(`${backendURL}/clients/securities`);
  const securities = data.map((client) => {
    const values = client.securities.map((value) => [`R$ ${Number(value[1]).toFixed(2)}`, client.name, client.CPF, value[0]]);
    return values;
  }).reduce((acc, client) => [...acc, ...client], []);
  
  return securities;
}

export const deleteSecuritie = async ({CPF, plate}: {CPF: string, plate: string}) => {
  await instance.delete(`${backendURL}/clients/securities`, {
    params: {
      CPF,
      plate
    },
  })
}

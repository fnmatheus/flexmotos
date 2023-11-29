import { instance } from '../../utils/axios';
import { backendURL } from '../../utils/urls';
import { ISecuritie } from '../../utils/interfaces';

export const getSecurities = async () => {
  const {data}: {data: ISecuritie[]} = await instance.get(`${backendURL}/clients/securities`);
  const securities = data.map((client) => {
    const values = client.securities.map((value) => [client.CPF, client.name, value]);
    return values;
  }).reduce((acc, client) => [...acc, ...client], []);
  
  return securities;
}

export const deleteSecuritie = async ({CPF, plate}: {CPF: string, plate: string}) => {
  console.log(CPF);
  await instance.delete(`${backendURL}/clients/securities`, {
    params: {
      CPF,
      plate
    },
  })
}

import { instance } from '../../utils/axios';
import { backendURL } from '../../utils/urls';
import { IClients } from '../../utils/interfaces';

export const getClients = async () => {
  const {data}: {data: IClients[]} = await instance.get(`${backendURL}/clients`);
  const clients: string[][] = data.map((client) => {
    const status = (client.status) ? 'Alugando' : 'Sem alugar';
    const lastVehiclePlate = client.lastVehicle[1];
    return [client.name, client.CPF, status, lastVehiclePlate]
  });
  return clients;
}

export const removeClient = async (CPF: string) => {
  await instance.delete(`${backendURL}/clients/remove`, {
    params: {
      CPF
    }
  });
  const clients = await getClients();
  return clients;
}

export const filterClientsByStatus = async (category: string) => {
  const url = (category !== '') ? `${backendURL}/clients/status` : `${backendURL}/clients`;
  const params = (category !== '') ? {params: { status: category }} : {};
  const {data}: {data: IClients[]} = await instance.get(url, params);
  const clients: string[][] = data.map((client) => {
    const status = (client.status) ? 'Alugando' : 'Sem alugar';
    const lastVehiclePlate = client.lastVehicle[1];
    return [client.name, client.CPF, status, lastVehiclePlate]
  });
  return clients;
}

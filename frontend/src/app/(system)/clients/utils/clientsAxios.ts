import { instance } from '../../utils/axios';
import { backendURL } from '../../utils/urls';
import { IClient, IClients } from '../../utils/interfaces';

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

export const addNewClient = async (client: (string | File | undefined)[]) => {
  try {
    const formData = new FormData();
    const [name, birth, cpf, cnh, phone, address, file] = client;
    if (name && birth && cpf && cnh && phone && address && file) {
      formData.append('name', name);
      formData.append('birth', birth);
      formData.append('CPF', cpf);
      formData.append('CNH', cnh);
      formData.append('phone', phone);
      formData.append('address', address);
      formData.append('file', file);
    }
    await instance.post(`${backendURL}/clients/add`, formData);
    const newClients = await getClients();
    return newClients;
  } catch (error) {
    return null;
  }
}


export const getClientDetails = async (CPF: string) => {
  const {data}: {data: IClient} = await instance.get(`${backendURL}/clients/client`, {
    params: {
      CPF
    }
  });
  return data;
}

export const updateClient = async (client: (string | File | undefined)[]) => {
  try {
    const formData = new FormData();
    const [name, birth, cpf, cnh, phone, address, file] = client;
    if (name && birth && cpf && cnh && phone && address) {
      formData.append('name', name);
      formData.append('birth', birth);
      formData.append('CPF', cpf);
      formData.append('CNH', cnh);
      formData.append('phone', phone);
      formData.append('address', address);
    }
    if (file) {
      formData.append('file', file);
    }
    await instance.post(`${backendURL}/clients/update`, formData);
    const newClients = await getClients();
    return newClients;
  } catch (error) {
    return null;
  }
}

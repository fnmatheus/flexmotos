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
    return [client.name, client.CPF, status, lastVehiclePlate];
  });
  return clients;
}

export const addNewClient = async (client: (string | File | undefined)[]) => {
  try {
    const formData = new FormData();
    const [name, birth, cpf, cnh, rg, nationality, job, maritalStatus, partnerName, phone, address, file] = client;
    if (name && birth && cpf && cnh && phone && address && file && rg && nationality && job && maritalStatus) {
      formData.append('name', name);
      formData.append('birth', birth);
      formData.append('CPF', cpf);
      formData.append('CNH', cnh);
      formData.append('RG', rg);
      formData.append('nationality', nationality);
      formData.append('job', job);
      formData.append('maritalStatus', `${maritalStatus} ${(partnerName !==  '' && partnerName) ? partnerName : ''}`);
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
    const [name, birth, cpf, cnh, rg, nationality, job, maritalStatus, partnerName, phone, address, file] = client;
    if (name && birth && cpf && cnh && phone && address && rg && nationality && job && `${maritalStatus} ${(partnerName !==  '' && partnerName) ? partnerName : ''}`) {
      formData.append('name', name);
      formData.append('birth', birth);
      formData.append('CPF', cpf);
      formData.append('CNH', cnh);
      formData.append('RG', rg);
      formData.append('nationality', nationality);
      formData.append('job', job);
      formData.append('maritalStatus', `${maritalStatus} ${(partnerName !==  '' && partnerName) ? partnerName : ''}`);
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

export const clientDownload = async (CPF: string) => {
  try {
    const response = await instance.get(`${backendURL}/clients/download`, {
      params: {
        CPF
      },
      responseType: 'blob'
    });
    const href = window.URL.createObjectURL(response.data);
    const anchorElement = document.createElement('a');
    anchorElement.href = href;
    anchorElement.download = 'comprovante';
    document.body.appendChild(anchorElement);
    anchorElement.click();
    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
  } catch (error) {
    alert('Erro ao tentar baixar o arquivo!');
  }
}

export const contractDownload = async (CPF: string) => {
  try {
    const response = await instance.get(`${backendURL}/clients/contract`, {
      params: {
        CPF
      },
      responseType: 'blob'
    });
    const href = window.URL.createObjectURL(response.data);
    const anchorElement = document.createElement('a');
    anchorElement.href = href;
    anchorElement.download = 'contrato';
    document.body.appendChild(anchorElement);
    anchorElement.click();
    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
  } catch (error) {
    alert('Não conseguiu baixar o arquivo do contrato!');
  }
}

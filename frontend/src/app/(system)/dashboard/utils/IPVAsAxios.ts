import { instance } from '../../utils/axios';
import { backendURL } from '../../utils/urls';
import { IIPVAs } from '../../utils/interfaces';

export const getIPVAs = async () => {
  const {data}: {data: IIPVAs[]} = await instance.get(`${backendURL}/vehicles/IPVA`);
  const IPVAs = data.map((IPVA) => [IPVA.plate, IPVA.model, IPVA.RENAVAM]);
  return IPVAs;
}

export const payIPVA = async (plate: string) => {
  await instance.post(`${backendURL}/vehicles/IPVA`, {plate});
}

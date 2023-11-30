import { instance } from '../../utils/axios';
import { IChanges } from '../../utils/interfaces';
import { backendURL } from '../../utils/urls';

export const getChanges = async () => {
  const {data}: {data: IChanges[]} = await instance.get(`${backendURL}/vehicles/oil`);
  const changes = data.map((vehicle) => [vehicle.plate, vehicle.model]);
  return changes;
}

export const changeOil = async (plate: string) => {
  await instance.post(`${backendURL}/vehicles/oil`, {plate});
}

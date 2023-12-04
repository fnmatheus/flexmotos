import { instance } from '../../utils/axios';
import { IVehicles } from '../../utils/interfaces';
import { backendURL } from '../../utils/urls';

export const getVehicles = async () => {
  const {data}: {data: IVehicles[]} = await instance.get(`${backendURL}/vehicles`);
  const vehicles: string[][] = data.map((vehicle) => {
    const status = (vehicle.status)
      ? 'Alugado'
      : 'Disponível';
    return [vehicle.model, vehicle.plate, vehicle.category, status];
  });
  return vehicles;
}

export const filterVehicleByStatus = async (status: string) => {
  const url = (status !== '') ? `${backendURL}/vehicles/status` : `${backendURL}/vehicles`;
  const params = (status !== '') ? {params: { status: status }} : {};
  const {data}: {data: IVehicles[]} = await instance.get(url, params);
  const vehicles: string[][] = data.map((vehicle) => {
    const status = (vehicle.status)
      ? 'Alugado'
      : 'Disponível';
    return [vehicle.model, vehicle.plate, vehicle.category, status];
  });
  return vehicles;
}

import { instance } from '../../utils/axios';
import { IVehicles } from '../../utils/interfaces';
import { backendURL } from '../../utils/urls';

export const getVehicles = async () => {
  const {data}: {data: IVehicles[]} = await instance.get(`${backendURL}/vehicles`);
  const vehicles: string[][] = data.map((vehicle) => {
    const status = (vehicle.status)
      ? 'Alugado'
      : 'Disponível';
    const rentValue = `R$ ${Number(vehicle.rentValue).toFixed(2)}`
    return [vehicle.model, vehicle.plate, rentValue, status];
  });
  return vehicles;
}

export const removeVehicle = async (plate: string) => {
  await instance.delete(`${backendURL}/vehicles/remove`, {
    params: {
      plate
    }
  });
  const vehicles = await getVehicles();
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
      const rentValue = `R$ ${Number(vehicle.rentValue).toFixed(2)}`
      return [vehicle.model, vehicle.plate, rentValue, status];
  });
  return vehicles;
}

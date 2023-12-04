import { instance } from '../../utils/axios';
import { IVehicles } from '../../utils/interfaces';
import { backendURL } from '../../utils/urls';

export const getVehicles = async () => {
  const {data}: {data: IVehicles[]} = await instance.get(`${backendURL}/vehicles`);
  const vehicles = data.map((vehicle) => {
    const status = (vehicle.status)
      ? 'Alugado'
      : 'Disponível';
    return [vehicle.category, vehicle.plate, vehicle.model, status];
  });
  return vehicles;
}

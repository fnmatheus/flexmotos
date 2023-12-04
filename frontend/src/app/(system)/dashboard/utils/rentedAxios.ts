import { instance } from '../../utils/axios';
import { backendURL } from '../../utils/urls';
import { IVehicles, IVehicliesDetails } from '../../utils/interfaces';

export const getVehicles = async () => {
  const {data}: {data: IVehicles[]} = await instance.get(`${backendURL}/vehicles/status`, {
    params: {
      status: true,
    }
  });
  const vehicles = await Promise.all(data.map(async (vehicle) => {
    const {data: vehicleInfo}: { data: IVehicliesDetails } = await instance.get(`${backendURL}/vehicles/vehicle`, {
      params: {
        plate: vehicle.plate
      }
    });
    return [vehicle.plate, vehicle.model, vehicleInfo.rent.returnDate];
  }));
  return vehicles;
}

import { getData } from '../../dashboard/utils/systemAxios';
import { instance } from '../../utils/axios';
import { IVehicle, IVehicles, IVehicleDetails, IRent, IPdfInformarion } from '../../utils/interfaces';
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

export const addVehicle = async (vehicle: IVehicle) => {
  await instance.post(`${backendURL}/vehicles/add`, vehicle);
  const vehicles = await getVehicles();
  return vehicles;
}

export const getVehicleDetails = async (plate: string) => {
  const {data}: {data: IVehicleDetails} = await instance.get(`${backendURL}/vehicles/vehicle`, {
    params: {
      plate
    },
  });
  return data;
}

export const updateVehicle = async (vehicle: IVehicle) => {
  await instance.post(`${backendURL}/vehicles/update`, vehicle);
  const vehicles = await getVehicles();
  return vehicles;
}

export const returnVehicle = async (plate: string) => {
  const vehicle = await getVehicleDetails(plate);
  const {CPF} = vehicle.rent;
  await instance.post(`${backendURL}/vehicles/return`, {
    CPF,
    plate
  });
  const vehicles = await getVehicles();
  return vehicles;
}

export const rentVehicle = async (info: IRent) => {
  try {
    await instance.post(`${backendURL}/vehicles/rent`, info);
    const vehicles = await getVehicles();
    return vehicles;
  } catch (error) {
    return null;
  }
}

export const getPdfInformation =async ({CPF, plate, rentalDate, returnDate, rentValue, securityValue}: IPdfInformarion) => {
  const systemData = await getData();
  const trafficTicketValue = systemData?.trafficTicketValue.toFixed(2);
  const fuelValue = systemData?.cleanValue.toFixed(2);
  const cleanValue = systemData?.fuelValue.toFixed(2);
  const contractCounter = String(systemData?.contractCounter);
  console.log(systemData);
  return;
}

import { getClientDetails } from '../../clients/utils/clientsAxios';
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

export const getPdfInformation = async ({CPF: clientCpf, plate: vehiclePlate, rentalDate, returnDate, rentValue, securityValue, rentTime}: IPdfInformarion) => {
  const systemData = await getData();
  const currentYear = String(new Date().getFullYear());
  const trafficTicketValue = systemData?.trafficTicketValue.toFixed(2).replace('.', ',');
  const fuelValue = systemData?.cleanValue.toFixed(2).replace('.', ',');
  const cleanValue = systemData?.fuelValue.toFixed(2).replace('.', ',');
  const contractCounter = String(systemData?.contractCounter);
  const {
    name: clientName,
    nationality: clientNationality,
    maritalStatus,
    job: clientJob,
    RG: clientRg,
    address: clientAddress,
    phone: clientPhone,
  } = await getClientDetails(clientCpf);
  const maritalArr = maritalStatus.split(' ');
  const clientMaritalStatus = `${maritalArr[0]} ${(maritalArr[0] === 'casado(a)' ? `com ${maritalArr[1]}` : '')}`;
  const {
    model: vehicleModel,
    year,
    chassis: vehicleChassis,
    color: vehicleColor,
    vehicleValue,
  } = await getVehicleDetails(vehiclePlate);
  const vehicleYear = year.split('/')[0];
  if (trafficTicketValue !== undefined && fuelValue !== undefined && cleanValue !== undefined) {
    return {currentYear, trafficTicketValue, fuelValue, cleanValue, contractCounter, clientCpf, clientName, clientNationality, clientMaritalStatus, clientJob, clientRg, clientAddress, clientPhone, vehiclePlate, vehicleModel, vehicleYear, vehicleChassis, vehicleColor, vehicleValue: vehicleValue.toFixed(2).replace('.', ','), rentalDate, returnDate, rentValue: rentValue.toFixed(2).replace('.', ','), securityValue: securityValue.toFixed(2).replace('.', ','), rentTime: String(rentTime)};
  }
  return null;
}

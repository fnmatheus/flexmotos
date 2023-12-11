import { instance } from '../../utils/axios';
import { IGetDataSystem, IGetYearlyBilling } from '../../utils/interfaces';
import { backendURL } from '../../utils/urls';

export const getData = async () => {
  try {
    const {data}: IGetDataSystem = await instance.get(`${backendURL}/system/dashboard`);
    const {today, goal: currGoal, month, trafficTicketValue, cleanValue, fuelValue,} = data;
    return {today, currGoal, month, trafficTicketValue, cleanValue, fuelValue};
  } catch (error) {
    return null;
  }
}

export const setGoalData = async (value: number) => {
  await instance.post('http://localhost:3000/system/goal', {value});
}

export const setTrafficTicketData = async (value: number) => {
  await instance.post('http://localhost:3000/system/traffic_ticket', {value});
}

export const setCleanData = async (value: number) => {
  await instance.post('http://localhost:3000/system/fuel', {value});
}

export const setFuelData = async (value: number) => {
  await instance.post('http://localhost:3000/system/clean', {value});
}

export const getYearlyBilling = async (value: number) => {
  const {data}: IGetYearlyBilling = await instance.get(`${backendURL}/system/billing`, {
      params: {
        value
      },
    }
  );
  const {years, billing} = data;
  const currentMonth = new Date().getMonth();
  const monthsPerYear = 12;
  const monthsBeforeBilling = monthsPerYear - (monthsPerYear - (currentMonth - 1) - (billing.length - 1));
  for(let i = 0; i <= monthsPerYear; i += 1) {
    if (i < monthsBeforeBilling) billing.unshift(0);
    else if (i > currentMonth) billing.push(0);
  }
  return ({years, billing});
}

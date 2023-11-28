import axios from 'axios';
import { instance } from '../../utils/axios';

interface IGetData {
  data: {
    today: number,
    goal: number,
    month: number
  }
}

interface IGetYearlyBilling {
  data: {
    years: string[],
    billing: number[]
  }
}

export const getData = async () => {
  const {data}: IGetData = await instance.get('http://localhost:3000/system/dashboard');
  return data;
}

export const setGoalData = async (value: number) => {
  await instance.post('http://localhost:3000/system/goal', {value});
}

export const getYearlyBilling = async (value: number) => {
  const {data}: IGetYearlyBilling = await instance.get('http://localhost:3000/system/billing', {
      params: {
        value
      },
    }
  );
  const {years, billing} = data;
  while (billing.length < 12) billing.push(0);
  return ({years, billing});
}

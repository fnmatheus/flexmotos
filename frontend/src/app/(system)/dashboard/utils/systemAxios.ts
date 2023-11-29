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
  try {
    const {data}: IGetData = await instance.get('http://localhost:3000/system/dashboard');
    const {today, goal: currGoal, month} = data;
    return {today, currGoal, month};
  } catch (error) {
    return null;
  }
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
  const currentMonth = new Date().getMonth();
  const monthsBeforeBilling = 12 - (12 - (currentMonth - 1) - (billing.length - 1));
  for(let i = 0; billing.length < 12; i += 1) {
    if (i < monthsBeforeBilling) billing.unshift(0);
    else if (i > currentMonth) billing.push(0);
  }
  return ({years, billing});
}

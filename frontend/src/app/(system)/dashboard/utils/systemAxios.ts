import { instance } from '../../utils/axios';
import { IGetDataSystem, IGetYearlyBilling } from '../../utils/interfaces';

export const getData = async () => {
  try {
    const {data}: IGetDataSystem = await instance.get('http://localhost:3000/system/dashboard');
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
  const monthsPerYear = 12;
  const monthsBeforeBilling = monthsPerYear - (monthsPerYear - (currentMonth - 1) - (billing.length - 1));
  for(let i = 0; i <= monthsPerYear; i += 1) {
    if (i < monthsBeforeBilling) billing.unshift(0);
    else if (i > currentMonth) billing.push(0);
  }
  return ({years, billing});
}

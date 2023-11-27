import axios from 'axios';
import { CookieValueTypes } from 'cookies-next';

interface IGetData {
  data: {
    today: number,
    goal: number,
    month: number
  }
}

interface ISetGoal {
  value: number,
  token: string
}

export const getData = async (token: CookieValueTypes) => {
  const { data }: IGetData = await axios.get('http://localhost:3000/system/dashboard', {
    headers: {
      'authorization': token,
    }
  });
  return data;
}

export const setGoalData = async ({value, token}: ISetGoal) => {
  await axios.post('http://localhost:3000/system/goal',
    {
      value
    },
    {
      headers : {
        'authorization': token,
      }
    }
  );
}

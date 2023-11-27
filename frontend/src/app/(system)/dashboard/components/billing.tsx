'use client'
import { Chart, ArcElement, Tooltip } from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { getData, setGoalData } from '../utils/systemAxios';
import { getCookie } from 'cookies-next';
import Popup from '../../popup';

interface IDoughnut {
  labels: string[],
  datasets: [{
    label: string,
    data: number[],
    backgroundColor: string[],
    borderColor: string[],
  }]
}

Chart.register(ArcElement, Tooltip);

export default function Billing() {
  const [daylyBilling, setDaylyBilling] = useState('0.00');
  const [monthlyBilling, setMonthlyBilling] = useState('0.00');
  const [goal, setGoal] = useState('0.00');
  const [goalPopup, setGoalPopup] = useState(false);
  const [token, setToken] = useState('');
  const [data, setData] = useState<IDoughnut>();

  useEffect(() => {
    async function setData() {
      const newToken = await getCookie('authorization');
      const {today, goal, month} = await getData(newToken);
      setGoal(goal.toFixed(2));
      setDaylyBilling(today.toFixed(2));
      setMonthlyBilling(month.toFixed(2));
      if (typeof newToken === 'string') setToken(newToken);
    }
    setData();
  }, []);

  useEffect(() => {
    async function setNewData() {
      const remainder = Number(goal) - Number(daylyBilling) - Number(monthlyBilling);
  
      setData({
        labels: ['Restante', 'Hoje', 'Esse mês'],
        datasets: [{
          label: 'Meta mensal',
          data: [remainder, Number(daylyBilling), Number(monthlyBilling)],
          backgroundColor: ['#EBEBEB', '#0745A0', '#40B649'],
          borderColor: ['#EBEBEB', '#0745A0', '#40B649'],
        }],
      });
    }
    setNewData();
  }, [daylyBilling, monthlyBilling, goal]);

  async function handleGoal(value?: number) {
    if (typeof value === 'number') {
      await setGoalData({value, token});
      setGoal(value.toFixed(2));
      setGoalPopup(false);
      return;
    }
    alert('campo inválido ou faltando preencher!');
  }
  
  return (
    <section>
      <div className='w-20 h-20'>
        {
          data &&
          <Doughnut
            data={data}
          />
        }
      </div>
      <h2>{`Meta mensal R$ ${goal}`}</h2>
      <div>
        <table>
          <thead>
            <tr>
              <th>Hoje</th>
              <th>Esse mês</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{`R$ ${daylyBilling}`}</td>
              <td>{`R$ ${monthlyBilling}`}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex gap-2">
        <button>
          Faturamento anual
        </button>
        <button onClick={() => setGoalPopup(true)}>
          Definir meta mensal
        </button>
      </div>
      {
        goalPopup &&
        <Popup
          title="Alterar meta mensal"
          handleYes={handleGoal}
          handleNo={() => setGoalPopup(false)}
          hasInput={true}
        />
      }
    </section>
  );
}

'use client'
import { Chart, ArcElement, Tooltip } from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';
import { getData, setGoalData } from '../utils/systemAxios';
import Popup from '../../../components/popup';
import YearlyBilling from './yearlyBilling';
import { IProps, IDoughnut } from '../../utils/interfaces';
import { billingButton, billingTable } from '@/app/utils/classnames';

Chart.register(ArcElement, Tooltip);

const Billing: React.FC<IProps> = ({token}: IProps) => {
  const [daylyBilling, setDaylyBilling] = useState('0.00');
  const [monthlyBilling, setMonthlyBilling] = useState('0.00');
  const [goal, setGoal] = useState('0.00');
  const [goalPopup, setGoalPopup] = useState(false);
  const [data, setData] = useState<IDoughnut>();
  const [billingPopup, setBillingPopup] = useState(false);
  const [invalidUser, setInvalidUser] = useState(true);

  useEffect(() => {
    async function setStates() {
      const response = await getData();
      if (response) {
        const {today, currGoal, month} = response;
        setGoal(currGoal.toFixed(2));
        setDaylyBilling(today.toFixed(2));
        setMonthlyBilling(month.toFixed(2));
        setInvalidUser(false);
      }
      else {
        setInvalidUser(true);
        setGoal('9999.99');
      }
    }
    if (token !== '') setStates();
  }, [token, setDaylyBilling]);

  useEffect(() => {
    async function setNewData() {
      const sumBilling = Number(daylyBilling) + Number(monthlyBilling);
      const remainder = (sumBilling < Number(goal)) ? Number(goal) - sumBilling : 0;
  
      setData({
        labels: ['Restante', 'Hoje', 'Esse mês'],
        datasets: [{
          label: 'Meta mensal',
          data: [remainder, Number(daylyBilling), Number(monthlyBilling)],
          backgroundColor: ['#E4E4E7', '#4338CA', '#40B649'],
          borderColor: ['#E4E4E7', '#4338CA', '#40B649'],
        }],
      });
    }
    setNewData();
  }, [daylyBilling, monthlyBilling, goal]);

  async function handleGoal(value: number) {
    if (typeof value === 'number') {
      await setGoalData(value);
      setGoal(value.toFixed(2));
      setGoalPopup(false);
      return;
    }
    alert('campo inválido ou faltando preencher!');
  }
  
  return (
    <section className="h-2/3 relative">
      {
        invalidUser &&
        <div className="absolute flex flex-col justify-center items-center w-full h-full bg-zinc-100 rounded-md opacity-30">
          <h2 className="text-red-500 font-semibold text-3xl">Usuário sem permissão!</h2>
        </div>
      }
      <div className="flex flex-col justify-center items-center gap-4 h-full">
        <div className="w-60 h-60">
          {
            data &&
            <Doughnut
              data={data}
            />
          }
        </div>
        <h2 className="font-medium text-2xl">{`Meta mensal R$ ${goal}`}</h2>
        <div className="w-full flex justify-center">
          <table className="w-1/2">
            <thead>
              <tr>
                <th className={billingTable}>Hoje</th>
                <th className={billingTable}>Esse mês</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={billingTable}>{`R$ ${daylyBilling}`}</td>
                <td className={billingTable}>{`R$ ${monthlyBilling}`}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex w-full justify-around items-center">
          <button className={`${billingButton} bg-indigo-700 text-white border border-indigo-700 hover:bg-transparent hover:text-indigo-700`} onClick={() => setBillingPopup(true)}>
            Faturamento anual
          </button>
          <button className={`${billingButton} bg-flex-green text-white border border-flex-green hover:bg-transparent hover:text-flex-green`} onClick={() => setGoalPopup(true)}>
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
        {
          billingPopup &&
          <YearlyBilling
            token={token}
            handleClose={() => setBillingPopup(false)}
          />
        }
      </div>
    </section>
  );
}

export default Billing;

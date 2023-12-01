'use client'
import { Chart, ArcElement, Tooltip } from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import React, { useEffect, useState } from 'react';
import { getData, setGoalData } from '../utils/systemAxios';
import Popup from '../../components/popup';
import YearlyBilling from './yearlyBilling';
import { IProps, IDoughnut } from '../../utils/interfaces';

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
          backgroundColor: ['#EBEBEB', '#0745A0', '#40B649'],
          borderColor: ['#EBEBEB', '#0745A0', '#40B649'],
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
    <section>
      {
        invalidUser && <h2>Usuário sem permissão</h2>
      }
      {
        !invalidUser &&
        <div>
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
            <button onClick={() => setBillingPopup(true)}>
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
          {
            billingPopup &&
            <YearlyBilling
              token={token}
              handleClose={() => setBillingPopup(false)}
            />
          }
        </div>
      }
    </section>
  );
}

export default Billing;

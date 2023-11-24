'use client'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import { useState } from 'react';

Chart.register(ArcElement, Tooltip);

export default function Billing() {
  const [daylyBilling, setDaylyBilling] = useState(0);
  const [monthlyBilling, setMonthlyBilling] = useState(0);
  const [goal, setGoal] = useState(0);

  const remainder = goal - daylyBilling - monthlyBilling;

  const data = {
    labels: ['Restante', 'Hoje', 'Esse mês'],
    datasets: [{
      label: 'Meta mensal',
      data: [remainder, daylyBilling, monthlyBilling],
      backgroundColor: ['#EBEBEB', '#0745A0', '#40B649'],
      borderColor: ['#EBEBEB', '#0745A0', '#40B649'],
    }],
  }
  
  return (
    <section>
      <div className='w-20 h-20'>
        <Doughnut
          data={data}
        />
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
        <button>Faturamento anual</button>
        <button>Definir meta mensal</button>
      </div>
    </section>
  );
}

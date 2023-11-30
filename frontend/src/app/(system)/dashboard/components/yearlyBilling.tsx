'use client';
import React, { useEffect, useState } from 'react';
import { getYearlyBilling } from '../utils/systemAxios';
import { IYearlyBilling, IBillings } from '../../utils/interfaces';

const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

const YearlyBilling: React.FC<IYearlyBilling> = ({token, handleClose}: IYearlyBilling) => {
  const [billings, setBillings] = useState<IBillings>();

  useEffect(() => {
    async function getBillings() {
      const currentYear = new Date().getFullYear();
      const newBillings = await getYearlyBilling(currentYear);
      setBillings(newBillings);
    }
    getBillings();
  }, [token]);

  async function handleYear(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedYear = Number(event.target.value);
    const newBillings = await getYearlyBilling(selectedYear);
    setBillings(newBillings);
  }

  return (
    <div>
      <div>
        <div className="flex gap-2">
          <h2>Faturamento anual</h2>
          <button onClick={handleClose}>Close</button>
        </div>
        <select onChange={handleYear} className="text-black" name="years" id="years">
          {
            billings?.years.map((year) => <option key={year} value={year}>{year}</option>)
          }
        </select>
        <table>
          <tbody>
            {
              billings?.billing.map((value, i) => <tr key={months[i]}>
                <td>{months[i]}</td>
                <td>{value}</td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default YearlyBilling;

'use client'
import { useEffect, useState } from 'react';
import { getYearlyBilling } from '../utils/systemAxios';

interface IYearlyBilling {
  token: string,
  handleClose(): void
}

interface IBillings {
  years: string[],
  billing: number[]
}

const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export default function YearlyBilling({token, handleClose}: IYearlyBilling) {
  const [billings, setBillings] = useState<IBillings>();

  useEffect(() => {
    async function getBillings() {
      const currentYear = new Date().getFullYear();
      const newBillings = await getYearlyBilling(currentYear);
      setBillings(newBillings);
    }
    getBillings();
  }, [token]);

  async function handleYear(e: React.ChangeEvent<HTMLSelectElement>) {
    console.log(e.target.value);
    const selectedYear = Number(e.target.value);
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

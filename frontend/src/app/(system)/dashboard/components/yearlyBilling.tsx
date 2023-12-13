'use client';
import React, { useEffect, useState } from 'react';
import { getYearlyBilling } from '../utils/systemAxios';
import { IYearlyBilling, IBillings } from '../../utils/interfaces';
import { Decline } from '@/app/components/svgs';
import { billingTable } from '@/app/utils/classnames';
import months from '../../utils/months';

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
    <div className="absolute w-screen h-screen flex justify-center items-center bg-black/40 bottom-0 left-0">
      <div className="relative flex flex-col gap-4 items-center bg-white text-black p-5 w-1/4">
        <button className="absolute top-2 right-2" onClick={handleClose}>
          <Decline className="text-[20px]" />
        </button>
        <div className="flex gap-2">
          <h2 className="font-semibold text-xl">Faturamento anual</h2>
        </div>
        <select onChange={handleYear} className={`${billingTable} w-1/3 text-xl`} name="years" id="years">
          {
            billings?.years.map((year) => <option key={year} value={year}>{year}</option>)
          }
        </select>
        <table className="w-full">
          <tbody className="text-xl w-full">
            {
              billings?.billing.map((value, i) => <tr key={months[i]}>
                <td className={billingTable}>{months[i]}</td>
                <td className={billingTable}>{`R$ ${value.toFixed(2)}`}</td>
              </tr>)
            }
          </tbody>
        </table>
        <p className="font-semibold text-xl">{`Total: R$ ${billings?.billing.reduce((acc, item) => {
          return acc + item;
        }, 0).toFixed(2)}`}</p>
      </div>
    </div>
  );
}

export default YearlyBilling;

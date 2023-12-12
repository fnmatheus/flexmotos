import React, { useEffect, useState } from 'react';
import { IConfirmRent } from '../../utils/interfaces';
import { getVehicleDetails } from '../utils/vehiclesAxios';
import dateDifference from '../../utils/dateDifference';
import { hoverPopupButtons, popupButtons, popupContainer, popupInput, popupLabel, popupLabelText } from '@/app/utils/classnames';
import { Agree, Decline } from '@/app/components/svgs';

const ConfirmRentPopup: React.FC<IConfirmRent> = ({CPF, name, plate, rentalDate, returnDate, security, handleYes, handleNo}: IConfirmRent) => {
  const [hasSecurity, setHasSecurity] = useState<boolean>(true);
  const [rentValue, setRentValue] = useState<string>('');
  const [securityValue, setSecurityValue] = useState<string>('0');
  const [daysDifference, setDaysDifference] = useState<number>(0);

  useEffect(() => {
    async function getValues() {
      const securityValue = security === 'true';
      setHasSecurity(securityValue);
      const vehicle = await getVehicleDetails(plate);
      const days = dateDifference(rentalDate, returnDate);
      setDaysDifference(days)
      setRentValue((vehicle.rentValue * days).toFixed(2));
      if (securityValue) {
        setSecurityValue(vehicle.securityValue.toFixed(2));
        return;
      }
      setSecurityValue('0.00');
    }
    getValues();
  }, [plate, security, rentalDate, returnDate]);

  async function handleRentValue(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value;
    setRentValue(value);
  }

  async function handleSecurityValue(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value;
    setSecurityValue(value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleYes({CPF, name, rentalDate, returnDate, plate, hasSecurity, rentValue: Number(rentValue), securityValue: Number(securityValue), rentTime: daysDifference});
  }

  return (
    <div className={popupContainer}>
      <form className="bg-white flex flex-col w-3/12 p-5 text-xl" onSubmit={handleSubmit}>
        <h2 className="font-semibold text-center pb-8">{`Alugar o veículo ${plate}`}</h2>
        <div className="flex flex-wrap text-black w-full">
          <label className={`${popupLabel} w-full`}>
            <span className={popupLabelText}>Cliente</span>
            <p>{`${name} ${CPF}`}</p>
          </label>
          <label className={`${popupLabel} w-4/12`}>
            <span className={popupLabelText}>Data do aluguel</span>
            <p>{rentalDate}</p>
          </label>
          <label className={`${popupLabel} w-4/12`}>
            <span className={popupLabelText}>Data de entrega</span>
            <p>{returnDate}</p>
          </label>
        </div>
        <div className="flex flex-wrap text-black w-full pb-8">
          <label className={`${popupLabel} w-4/12`}>
            <span className={popupLabelText}>Valor do caução</span>
            <input className={popupInput} onChange={handleSecurityValue} type="text" value={securityValue} disabled={!hasSecurity} pattern="\d+.\d\d" required />
          </label>
          <label className={`${popupLabel} w-4/12`}>
            <span className={popupLabelText}>Valor do aluguel</span>
            <input className={popupInput} onChange={handleRentValue} type="text" value={rentValue} pattern="\d+.\d\d" required />
          </label>
          <label className={`${popupLabel} gap-2`}>
            <span className={popupLabelText}>Valor total</span>
            <p>{`R$ ${(Number(rentValue) + Number(securityValue)).toFixed(2)}`}</p>
          </label>
        </div>
        <div className={popupButtons}>
          <button className={hoverPopupButtons} type="submit">
            <Agree />
          </button>
          <button className={hoverPopupButtons} onClick={handleNo}>
            <Decline />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ConfirmRentPopup;

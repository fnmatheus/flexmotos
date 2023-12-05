import React, { useEffect, useState } from 'react';
import { IConfirmRent } from '../../utils/interfaces';
import { getVehicleDetails } from '../utils/vehiclesAxios';
import dateDifference from '../../utils/dateDifference';

const ConfirmRentPopup: React.FC<IConfirmRent> = ({CPF, name, plate, rentalDate, returnDate, security, handleYes, handleNo}: IConfirmRent) => {
  const [hasSecurity, setHasSecurity] = useState<boolean>(true);
  const [rentValue, setRentValue] = useState<string>('');
  const [securityValue, setSecurityValue] = useState<string>('0');

  useEffect(() => {
    async function getValues() {
      const securityValue = security === 'true';
      setHasSecurity(securityValue);
      const vehicle = await getVehicleDetails(plate);
      const days = dateDifference(rentalDate, returnDate)
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
    handleYes({CPF, name, rentalDate, returnDate, plate, hasSecurity, rentValue: Number(rentValue), securityValue: Number(securityValue)});
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{`Alugar o veículo ${plate}`}</h2>
        <div className="flex gap-2">
          <p>{`${name} ${CPF}`}</p>
          <p>{rentalDate}</p>
          <p>{returnDate}</p>
          <p>{security}</p>
        </div>
        <div className="flex gap-2">
          <input onChange={handleRentValue} type="text" value={rentValue} pattern="\d+.\d\d" required />
          <input onChange={handleSecurityValue} type="text" value={securityValue} readOnly={!hasSecurity} pattern="\d+.\d\d" required />
          <p>{`R$ ${(Number(rentValue) + Number(securityValue)).toFixed(2)}`}</p>
        </div>
        <div className="flex gap-2">
          <button type="submit">
            Yes
          </button>
          <button onClick={handleNo}>
            No
          </button>
        </div>
      </form>
    </div>
  );
}

export default ConfirmRentPopup;

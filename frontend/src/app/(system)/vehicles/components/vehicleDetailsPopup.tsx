import React, { useEffect, useState } from 'react';
import { IVehicleDetailsPopup } from '../../utils/interfaces';
import { getVehicleDetails } from '../utils/vehiclesAxios';
import { popupContainer } from '@/app/utils/classnames';

const VehicleDetailsPopup: React.FC<IVehicleDetailsPopup> = ({plate, handleClose}: IVehicleDetailsPopup) => {
  const [category, setCategory] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [renavam, setRenavam] = useState<string>('');
  const [ipva, setIpva] = useState<string>('');
  const [mileage, setMileage] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [client, setClient] = useState<string>('');
  const [rentalDate, setRentalDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');
  const [securityValue, setSecurityValue] = useState<string>('');
  const [rentValue, setRentValue] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  useEffect(() => {
    async function getVehicle() {
      const vehicle = await getVehicleDetails(plate);
      setCategory(vehicle.category);
      setModel(vehicle.model);
      setYear(vehicle.year);
      setRenavam(vehicle.RENAVAM);
      const ipvaValue = (vehicle.IPVA) ? 'Pago' : 'Não pago';
      setIpva(ipvaValue);
      setMileage(`${vehicle.mileage.toFixed(2)} Km`);
      const statusValue = (vehicle.rent.status) ? 'Alugado' : 'Disponível';
      setStatus(statusValue);
      setClient(`${vehicle.rent.CPF} ${vehicle.rent.name}`);
      setRentalDate(vehicle.rent.rentalDate);
      setReturnDate(vehicle.rent.returnDate);
      setSecurityValue(`R$ ${vehicle.securityValue.toFixed(2)}`);
      setRentValue(`R$ ${vehicle.rentValue.toFixed(2)}`);
      setAmount(`R$ ${vehicle.amount.toFixed(2)}`);
    }
    getVehicle();
  }, [plate]);

  return (
    <div className={popupContainer}>
      <div>
        <div>
          <button onClick={handleClose}>
            close
          </button>
        </div>
        <div>
          <h2>Informações do veículo</h2>
          <div>
            <p>{category}</p>
            <p>{model}</p>
            <p>{year}</p>
            <p>{renavam}</p>
            <p>{ipva}</p>
            <p>{mileage}</p>
            <p>{status}</p>
            <p>{client}</p>
            <p>{rentalDate}</p>
            <p>{returnDate}</p>
            <p>{securityValue}</p>
            <p>{rentValue}</p>
            <p>{amount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleDetailsPopup;

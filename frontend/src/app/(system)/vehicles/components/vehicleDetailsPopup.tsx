import React, { useEffect, useState } from 'react';
import { IVehicleDetailsPopup } from '../../utils/interfaces';
import { getVehicleDetails } from '../utils/vehiclesAxios';
import { hoverPopupButtons, popupContainer, popupLabelText } from '@/app/utils/classnames';
import { Decline } from '@/app/components/svgs';

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
      <div className="bg-white flex flex-col gap-8 p-5 relative w-5/12">
        <button className={`${hoverPopupButtons} absolute top-1 right-1 text-xl`} onClick={handleClose}>
          <Decline />
        </button>
        <div className="flex flex-col gap-2 text-xl items-center">
          <h2 className="font-semibold">Informações do veículo</h2>
          <div className="flex flex-wrap justify-start">
            <label className="w-1/12 text-left p-1">
              <span className={popupLabelText}>Categoria</span>
              <p>{category}</p>
            </label>
            <label className="w-6/12 text-left p-1">
              <span className={popupLabelText}>Modelo</span>
              <p>{model}</p>
            </label>
            <label className="w-5/12 text-left p-1">
              <span className={popupLabelText}>Ano</span>
              <p>{year}</p>
            </label>
            <label className="w-2/12 text-left p-1">
              <span className={popupLabelText}>Placa</span>
              <p>{plate}</p>
            </label>
            <label className="w-2/12 text-left p-1">
              <span className={popupLabelText}>RENAVAM</span>
              <p>{renavam}</p>
            </label>
            <label className="w-2/12 text-left p-1">
              <span className={popupLabelText}>IPVA</span>
              <p>{ipva}</p>
            </label>
            <label className="w-6/12 text-left p-1">
              <span className={popupLabelText}>Quilometragem</span>
              <p>{mileage}</p>
            </label>
            <label className="w-2/12 text-left p-1">
              <span className={popupLabelText}>Status</span>
              <p>{status}</p>
            </label>
            <label className="w-6/12 text-left p-1">
              <span className={popupLabelText}>Cliente alugando</span>
              <p>{client}</p>
            </label>
            <label className="w-2/12 text-left p-1">
              <span className={popupLabelText}>Alugado em</span>
              <p>{rentalDate}</p>
            </label>
            <label className="w-2/12 text-left p-1">
              <span className={popupLabelText}>Alugado até</span>
              <p>{returnDate}</p>
            </label>
            <label className="w-2/12 text-left p-1">
              <span className={popupLabelText}>Valor do caução</span>
              <p>{securityValue}</p>
            </label>
            <label className="w-2/12 text-left p-1">
              <span className={popupLabelText}>Valor do aluguel</span>
              <p>{rentValue}</p>
            </label>
            <label className="text-left p-1">
              <span className={popupLabelText}>Valor arrecadado mensal</span>
              <p>{amount}</p>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleDetailsPopup;

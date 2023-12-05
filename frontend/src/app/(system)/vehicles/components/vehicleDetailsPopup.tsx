import React, { useEffect, useState } from 'react';
import { IVehicleDetailsPopup } from '../../utils/interfaces';
import { getVehicleDetails } from '../utils/vehiclesAxios';

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
      console.log(vehicle);
    }
    getVehicle()
  }, [plate]);

  return (
    <div>
      <div>
        <div>
          <button onClick={handleClose}>
            close
          </button>
        </div>
        <div>
          <h2>Informações do veículo</h2>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default VehicleDetailsPopup;

import React, { useEffect, useState } from 'react';
import { IProps } from '../../utils/interfaces';
import { changeOil, getChanges } from '../utils/oilAxios';
import DashboardTable from './dashboardTable';

const OilChanges: React.FC<IProps> = ({token}: IProps) => {
  const [vehicles, setVehicles] = useState<string[][]>([]);
  const [popup, setPopup] = useState<string[]>([]);

  useEffect(() => {
    async function getOilChanges() {
      if (token !== '') {
        const data: string[][] = await getChanges();
        setVehicles(data);
      }
    }
    getOilChanges();
  }, [token, popup]);

  async function handleChange(vehicle: string[]) {
    const [plate] = vehicle;
    await changeOil(plate);
    setPopup([]);
  }

  return (
    <DashboardTable
      tableTitle='Troca de óleo'
      vehicles={vehicles}
      hasButton
      buttonText='TROCAR'
      handleButton={(vehicle) => setPopup(vehicle)}
      hasPopup
      popup={popup}
      popuptext={`Trocou o óleo do veículo ${popup[0]}`}
      handleYes={() => handleChange(popup)}
      handleNo={() => setPopup([])}
    />
  );
}

export default OilChanges;

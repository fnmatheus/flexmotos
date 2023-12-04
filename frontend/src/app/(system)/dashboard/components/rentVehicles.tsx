import React, { useEffect, useState } from 'react';
import { IProps } from '../../utils/interfaces';
import { getVehicles } from '../utils/rentedAxios';
import DashboardTable from './dashboardTable';

const RentVehicles: React.FC<IProps> = ({token}: IProps) => {
  const [vehicles, setVehicles] = useState<string[][]>([]);

  useEffect(() => {
    async function getVehiclesData() {
      if (token !== '') {
        const data = await getVehicles();
        setVehicles(data);
      }
    }
    getVehiclesData();
  }, [token]);

  return (
    <DashboardTable
      tableTitle='Veículos para devolução'
      vehicles={vehicles}
      hasThirdText
    />
  );
}

export default RentVehicles;

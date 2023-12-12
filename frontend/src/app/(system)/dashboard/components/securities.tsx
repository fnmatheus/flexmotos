import React, { useEffect, useState } from 'react';
import { IProps } from '../../utils/interfaces';
import { getSecurities, deleteSecuritie } from '../utils/securitieAxios';
import DashboardTable from './dashboardTable';

const Securities: React.FC<IProps> = ({token}: IProps) => {
  const [vehicles, setVehicles] = useState<string[][]>([]);
  const [popup, setPopup] = useState<string[]>([]);

  useEffect(() => {
    async function getSecuritiesData() {
      if (token !== '') {
        const currentSecurities = await getSecurities();
        setVehicles(currentSecurities);
      }
    }
    getSecuritiesData();
  }, [token, popup]);

  const handleReturn = async (vehicle: string[]) => {
    const [_value, _name, CPF, plate] = vehicle;
    await deleteSecuritie({CPF, plate});
    setPopup([]);
  }

  return (
    <div className="h-1/3 w-3/5">
      <DashboardTable
        tableTitle='Cauções'
        vehicles={vehicles}
        hasButton
        buttonText='DEVOLVER'
        handleButton={(vehicle) => setPopup(vehicle)}
        hasPopup
        popup={popup}
        popuptext={`Confirmar devolução do calção de ${popup[2]} com o veículo de placa ${popup[3]}?`}
        handleYes={() => handleReturn(popup)}
        handleNo={() => setPopup([])}
      />
    </div>
  );
}

export default Securities;

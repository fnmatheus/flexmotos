import React, { useEffect, useState } from 'react';
import { IProps } from '../../utils/interfaces';
import { getIPVAs, payIPVA } from '../utils/IPVAsAxios';
import DashboardTable from './dashboardTable';
import { useRouter } from 'next/navigation';

const IPVAsToPay: React.FC<IProps> = ({token}: IProps) => {
  const [vehicles, setVehicles] = useState<string[][]>([]);
  const [popup, setPopup] = useState<string[]>([]);

  const router = useRouter();

  useEffect(() => {
    async function getIPVAsData() {
      try {
        if (token !== '') {
          const data: string[][] = await getIPVAs();
          setVehicles(data);
        }
      } catch (error) {
        router.push('/');
      }
    }
    getIPVAsData();
  }, [token, router, popup]);

  async function handlePayIPVA(vehicle: string[]) {
    const [plate] = vehicle;
    await payIPVA(plate);
    setPopup([]);
  }

  return (
    <div className="h-1/3 w-2/5">
      <DashboardTable
        tableTitle='IPVAs à pagar'
        vehicles={vehicles}
        hasButton
        buttonText='PAGAR'
        handleButton={(vehicle) => setPopup(vehicle)}
        hasPopup
        popup={popup}
        popuptext={`
          Utilize o RENAVAM para consultar e pagar o IPVA do veículo escolhido no site do DETRAN - RENAVAM: ${popup[2]}
        `}
        handleYes={() => handlePayIPVA(popup)}
        handleNo={() => setPopup([])}
      />
    </div>
  );
}

export default IPVAsToPay

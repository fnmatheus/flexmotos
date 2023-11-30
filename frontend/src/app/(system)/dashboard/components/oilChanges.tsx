import React, { useEffect, useState } from 'react';
import { IProps } from '../../utils/interfaces';
import { changeOil, getChanges } from '../utils/oilAxios';
// import Popup from '../../popup';
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
  }, [token, vehicles]);

  async function handleChange(vehicle: string[]) {
    const [plate] = vehicle;
    await changeOil(plate);
    setPopup([]);
  }

  return (
    // <div>
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>Troca de óleo</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {
    //         vehicles.map((vehicle) => {
    //           const [plate, model] = vehicle;
    //           return (
    //             <tr key={plate}>
    //               <td className="flex gap-2">
    //                 <p>{model}</p>
    //                 <p>{plate}</p>
    //                 <button onClick={() => setPopup(vehicle)}>
    //                   TROCAR
    //                 </button>
    //               </td>
    //             </tr>
    //           );
    //         })
    //       }
    //     </tbody>
    //   </table>
    //   {
    //     popup.length > 0 &&
    //     <Popup
    //       title={`Trocou o óleo do veículo ${popup[0]}`}
    //       handleYes={() => handleChange(popup)}
    //       handleNo={() => setPopup([])}
    //     />
    //   }
    // </div>
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

import React, { useEffect, useState } from 'react';
import { IProps } from '../../utils/interfaces';
import { getVehicles } from '../utils/rentedAxios';

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
    <div>
      <table>
        <thead>
          <tr>
            <th>Veículos para devolução</th>
          </tr>
        </thead>
        <tbody>
          {
            vehicles.map((vehicle) => {
              const [plate, model, returnDate] = vehicle
              return (
                <tr key={plate}>
                  <td className="flex gap-2">
                    <p>{model}</p>
                    <p>{plate}</p>
                    <p>{returnDate}</p>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default RentVehicles;

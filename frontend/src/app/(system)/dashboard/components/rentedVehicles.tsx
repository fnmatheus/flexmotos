import React, { useEffect, useState } from 'react';
import { IProps } from '../../utils/interfaces';

const RentedVehicles: React.FC<IProps> = ({token}: IProps) => {
  const [vehicles, setVehicles] = useState<string[][]>([]);
  const [popup, setPopup] = useState<string[]>([]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Veículos para devolução</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
}

export default RentedVehicles;

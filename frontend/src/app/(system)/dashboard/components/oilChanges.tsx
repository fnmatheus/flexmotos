import React, { useEffect, useState } from 'react';
import { IProps } from '../../utils/interfaces';
import { changeOil, getChanges } from '../utils/oilAxios';
import Popup from '../../popup';

const OilChanges: React.FC<IProps> = ({token}: IProps) => {
  const [changes, setChanges] = useState<string[][]>([]);
  const [popup, setPopup] = useState<string[]>([]);

  useEffect(() => {
    async function getOilChanges() {
      if (token !== '') {
        const data = await getChanges();
        setChanges(data);
      }
    }
    getOilChanges();
  }, [token, changes]);

  async function handleChange(vehicle: string[]) {
    const [plate] = vehicle;
    await changeOil(plate);
    setPopup([]);
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Troca de óleo</th>
          </tr>
        </thead>
        <tbody>
          {
            changes.map((vehicle) => {
              const [plate, model] = vehicle;
              return (
                <tr key={plate}>
                  <td className="flex gap-2">
                    <p>{model}</p>
                    <p>{plate}</p>
                    <button onClick={() => setPopup(vehicle)}>
                      TROCAR
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
      {
        popup.length > 0 &&
        <Popup
          title={`Trocou o óleo do veículo ${popup[0]}`}
          handleYes={() => handleChange(popup)}
          handleNo={() => setPopup([])}
        />
      }
    </div>
  );
}

export default OilChanges;

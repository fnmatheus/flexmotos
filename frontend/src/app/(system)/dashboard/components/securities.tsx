import React, { useEffect, useState } from 'react';
import { IProps } from '../../utils/interfaces';
import { getSecurities, deleteSecuritie } from '../utils/securitieAxios';
import Popup from '../../popup';

const Securities: React.FC<IProps> = ({token}: IProps) => {
  const [securities, setSecurities] = useState<string[][]>([]);
  const [popup, setPopup] = useState<string[]>([]);

  useEffect(() => {
    async function getSecuritiesData() {
      if (token !== '') {
        const currentSecurities = await getSecurities();
        setSecurities(currentSecurities);
      }
    }
    getSecuritiesData();
  }, [token, securities]);

  const handleReturn = async (value: string[]) => {
    const [CPF, plate] = value;
    deleteSecuritie({CPF, plate});
    setPopup([]);
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Cauções</th>
          </tr>
        </thead>
        <tbody>
          {
            securities.map((securitie, i) => {
              const [CPF, name, securitiesInfo] = securitie;
              const value = Number(securitiesInfo[1]).toFixed(2);
              return (
                <tr key={`${CPF} ${String(i)}`}>
                  <td className="flex gap-2">
                    <p>{name}</p>
                    <p>{`R$ ${value}`}</p>
                    <button onClick={() => setPopup([CPF, securitiesInfo[0], name])}>
                      Devolver
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
          title={`Devolveu o dinheiro do calção do ${popup[2]} com o veículo de placa ${popup[1]}?`}
          handleYes={() => handleReturn(popup)}
          handleNo={() => setPopup([])}
        />
      }
    </div>
  );
}

export default Securities;

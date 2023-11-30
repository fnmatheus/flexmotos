import React, { useEffect, useState } from 'react';
import { IProps } from '../../utils/interfaces';
import { getIPVAs, payIPVA } from '../utils/IPVAsAxios';
import Popup from '../../popup';

const IPVAsToPay: React.FC<IProps> = ({token}: IProps) => {
  const [IPVAs, setIPVAs] = useState<string[][]>([]);
  const [popup, setPopup] = useState<string[]>([]);

  useEffect(() => {
    async function getIPVAsData() {
      if (token !== '') {
        const data: string[][] = await getIPVAs();
        setIPVAs(data);
      }
    }
    getIPVAsData();
  }, [token, IPVAs]);

  async function handlePayIPVA(vehicle: string[]) {
    const [plate] = vehicle;
    await payIPVA(plate);
    setPopup([]);
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>IPVAs à pagar</th>
          </tr>
        </thead>
        <tbody>
          {
            IPVAs.map((IPVA) => {
              const [plate, model] = IPVA;
              return (
                <tr key={plate}>
                  <td className="flex gap-2">
                    <p>{model}</p>
                    <p>{plate}</p>
                    <button onClick={() => setPopup(IPVA)}>
                      PAGAR
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {
        popup.length > 0 &&
        <Popup
          title={`Pagar IPVA do veículo ${popup[0]}`}
          text={`
            Utilize o RENAVAM para consultar e pagar o IPVA
            do veículo escolhido no site do DETRAN

            RENAVAM: ${popup[2]}
          `}
          hasText={true}
          handleYes={() => handlePayIPVA(popup)}
          handleNo={() => setPopup([])}
        />
      }
    </div>
  );
}

export default IPVAsToPay

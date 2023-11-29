import { useEffect, useState } from 'react';
import { IProps } from '../../utils/interfaces';
import { getSecurities } from '../utils/securitieAxios';

const Securities: React.FC<IProps> = ({token}: IProps) => {
  const [securities, setSecurities] = useState<string[][]>([]);

  useEffect(() => {
    async function getSecuritiesData() {
      if (token !== '') {
        const currentSecurities = await getSecurities();
        setSecurities(currentSecurities);
      }
    }
    getSecuritiesData();
  }, [token]);

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
                <tr key={`${CPF}${String(i)}`}>
                  <td className="flex gap-2">
                    <p>{name}</p>
                    <p>{`R$ ${value}`}</p>
                    <button>Devolver</button>
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

export default Securities;

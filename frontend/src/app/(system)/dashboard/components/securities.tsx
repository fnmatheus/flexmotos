import { useEffect, useState } from 'react';
import { IProps, ISecuritie } from '../../utils/interfaces';
import { getSecurities } from '../utils/securitieAxios';

const Securities: React.FC<IProps> = ({token}: IProps) => {
  const [securities, setSecurities] = useState();

  useEffect(() => {
    async function getSecuritiesData() {
      if (token !== '') {
        const currentSecurities = await getSecurities();
        console.log(currentSecurities);
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
          <tr>
            <td className="flex gap-2">
              <p>Nome do cliente</p>
              <p>R$ 9999999,99</p>
              <button>Devolver</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Securities;

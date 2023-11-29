import React from 'react';
import { IProps } from '../../utils/interfaces';

const IPVAsToPay: React.FC<IProps> = ({token}: IProps) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>IPVAs à pagar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="flex gap-2">
              <p>xtz 150</p>
              <p>XXXXXXX</p>
              <button>
                PAGAR
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default IPVAsToPay

import React, { useEffect, useState } from 'react';
import { IProps } from '../../utils/interfaces';

const OilChanges: React.FC<IProps> = ({token}: IProps) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Troca de óleo</th>
          </tr>
        </thead>
        <tbody>
          {}
        </tbody>
      </table>
    </div>
  );
}

export default OilChanges;

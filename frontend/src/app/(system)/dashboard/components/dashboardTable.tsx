import React from 'react';
import Popup from '../../../components/popup';
import { IDashboardTable } from '../../utils/interfaces';

const DashboardTable: React.FC<IDashboardTable> = (
  {tableTitle, vehicles, hasButton, buttonText, handleButton, hasThirdText, hasPopup, popup, popuptext, handleYes, handleNo}: IDashboardTable
) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>{tableTitle}</th>
          </tr>
        </thead>
        <tbody>
          {
            vehicles.map((vehicle) => {
              const [plate, model] = vehicle;
              return (
                <tr key={plate}>
                  <td className="flex gap-2">
                    <p>{model}</p>
                    <p>{plate}</p>
                    {
                      hasButton && handleButton &&
                      <button onClick={() => handleButton(vehicle)}>
                        {buttonText}
                      </button>
                    }
                    {
                      hasThirdText &&
                      <p>{vehicle[2]}</p>
                    }
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
      {
        hasPopup && popup && popup.length > 0 &&
        <Popup
          title={popuptext}
          handleYes={handleYes}
          handleNo={handleNo}
        />
      }
    </div>
  );
}

export default DashboardTable;

import React from 'react';
import Popup from '../../../components/popup';
import { IDashboardTable } from '../../utils/interfaces';
import { dashboardTable } from '@/app/utils/classnames';

const DashboardTable: React.FC<IDashboardTable> = (
  {tableTitle, vehicles, hasButton, buttonText, handleButton, hasThirdText, hasPopup, popup, popuptext, handleYes, handleNo}: IDashboardTable
) => {
  return (
    <div className="w-full">
      <div className={dashboardTable}>
        <table className="flex flex-col w-full text-xl">
          <thead className="border-b border-zinc-400 w-full flex justify-center">
            <tr>
              <th className="font-normal">{tableTitle}</th>
            </tr>
          </thead>
          <tbody className="flex flex-col w-full m-1">
            {
              vehicles.map((vehicle) => {
                const [plate, model] = vehicle;
                return (
                  <tr className="flex w-full items-center" key={plate}>
                    <td className="border-spacing-0 flex w-full justify-between px-2">
                      <p className="w-2/5">{model}</p>
                      <p className="text-center w-1/5">{plate}</p>
                      {
                        hasButton && handleButton &&
                        <button className="w-1/6 text-center bg-amber-400 font-semibold text-black rounded-md" onClick={() => handleButton(vehicle)}>
                          {buttonText}
                        </button>
                      }
                      {
                        hasThirdText &&
                        <p className="w-1/5">{vehicle[2]}</p>
                      }
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
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

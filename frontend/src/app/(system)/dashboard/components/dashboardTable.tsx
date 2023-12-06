import React from 'react';
import Popup from '../../../components/popup';
import { IDashboardTable } from '../../utils/interfaces';
import { dashboardTable } from '@/app/utils/classnames';

const DashboardTable: React.FC<IDashboardTable> = (
  {tableTitle, vehicles, hasButton, buttonText, handleButton, hasThirdText, hasPopup, popup, popuptext, handleYes, handleNo}: IDashboardTable
) => {
  return (
    <div className="w-full h-full p-1">
      <div className="w-full h-full">
        <table className={dashboardTable}>
          <thead className="border-b border-zinc-400 w-full h-[40px] flex justify-center">
            <tr className="h-full">
              <th className="font-normal text-xl h-full">{tableTitle}</th>
            </tr>
          </thead>
          <tbody className="flex flex-col gap-2 w-full h-full overflow-scroll overflow-x-hidden my-2">
            {
              vehicles.map((vehicle) => {
                const [plate, model] = vehicle;
                return (
                  <tr className="grid grid-cols-4 px-4" key={plate}>
                    <td className="col-span-2 ml-1">
                      {model}
                    </td>
                    <td className="flex justify-center">
                      {plate}
                    </td>
                    {
                      hasButton && handleButton &&
                      <td className="flex justify-end mr-1">
                        <button className="w-max px-1 text-center bg-amber-400 font-semibold text-black rounded-md" onClick={() => handleButton(vehicle)}>
                          {buttonText}
                        </button>
                      </td>
                    }
                    {
                      hasThirdText &&
                      <td className="flex justify-end mr-1">
                        {vehicle[2]}
                      </td>
                    }
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

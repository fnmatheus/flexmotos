import React from 'react';
import Popup from '../../components/popup';
import { IPageTable } from '../utils/interfaces';
import { Decline, Edit } from '@/app/components/svgs';
import { pageTableButton, pageTableButtonIndigo } from '@/app/utils/classnames';

const PageTable: React.FC<IPageTable> = ({tableHeads, tableBody, handleEdit, handleRemove, popup, popupText, handleConfirmRemove, handleDeclineRemove, hasDetails, handleDetails, hasRentAndReturn, handleRent, handleReturn}: IPageTable) => {
  return (
    <div className="w-full h-full border rounded-md border-zinc-400">
      <table className="h-full w-full text-xl text-zinc-600">
        <thead className="w-full border-b border-zinc-400">
          <tr className="grid grid-cols-5 w-[99%] p-1">
            {
              tableHeads.map((text) => <th className="text-center" key={text}>{text}</th>)
            }
          </tr>
        </thead>
        <tbody className="flex flex-col gap-1 p-4 h-full overflow-scroll overflow-x-hidden">
          {
            tableBody.map((item) => {
              return (
                <tr className="grid grid-cols-5 w-full" key={item[1]}>
                  <td className="w-full truncate">{item[0]}</td>
                  <td className="text-center w-full truncate">{item[1]}</td>
                  <td className="text-center w-full truncate">{item[2]}</td>
                  <td className="text-center w-full truncate">{item[3]}</td>
                  {
                    item[2] !== 'super' &&
                    <td className="flex justify-end gap-2">
                      {
                        hasRentAndReturn && handleRent && handleReturn &&
                        ((item[3] !== 'Alugado')
                          ? <button className={`${pageTableButton} ${pageTableButtonIndigo}`} onClick={() => handleRent(item[1])}>
                            Alugar
                          </button>
                          : <button className={`${pageTableButton} bg-amber-400 border-amber-400 text-black hover:bg-transparent hover:text-amber-400`} onClick={() => handleReturn(item[1])}>
                            Devolver
                          </button>)
                      }
                      {
                        hasDetails && handleDetails &&
                        <button className={`${pageTableButton} ${pageTableButtonIndigo}`} onClick={() => handleDetails(item[1])}>
                          Detalhes
                        </button>
                      }
                      <button className="hover:opacity-50" onClick={() => handleEdit(item[1])}>
                        <Edit />
                      </button>
                      <button className="hover:opacity-50" onClick={() => handleRemove([item[1], item[0]])}>
                        <Decline />
                      </button>
                    </td>
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
      {
        popup[0] !== '' &&
        <Popup
          title={`${popupText} ${popup[1]}?`}
          handleYes={() => handleConfirmRemove(popup[0])}
          handleNo={handleDeclineRemove}
        />
      }
    </div>
  );
}

export default PageTable

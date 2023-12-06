import React from 'react';
import Popup from '../../components/popup';
import { IPageTable } from '../utils/interfaces';

const PageTable: React.FC<IPageTable> = ({tableHeads, tableBody, handleEdit, handleRemove, popup, popupText, handleConfirmRemove, handleDeclineRemove, hasDetails, handleDetails, hasRentAndReturn, handleRent, handleReturn}: IPageTable) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            {
              tableHeads.map((text) => <th key={text}>{text}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {
            tableBody.map((item) => {
              return (
                <tr key={item[1]}>
                  <td>{item[0]}</td>
                  <td>{item[1]}</td>
                  <td>{item[2]}</td>
                  <td>{item[3]}</td>
                  {
                    item[2] !== 'super' &&
                    <td className="flex gap-2">
                      {
                        hasRentAndReturn && handleRent && handleReturn &&
                        ((item[3] !== 'Alugado')
                          ? <button onClick={() => handleRent(item[1])}>
                            Alugar
                          </button>
                          : <button onClick={() => handleReturn(item[1])}>
                            Devolver
                          </button>)
                      }
                      {
                        hasDetails && handleDetails &&
                        <button onClick={() => handleDetails(item[1])}>
                          Detalhes
                        </button>
                      }
                      <button onClick={() => handleEdit(item[1])}>
                        edit
                      </button>
                      <button onClick={() => handleRemove([item[1], item[0]])}>
                        remove
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

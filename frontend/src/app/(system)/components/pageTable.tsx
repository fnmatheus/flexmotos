import React from 'react';
import Popup from './popup';
import { IPageTable } from '../utils/interfaces';

const PageTable: React.FC<IPageTable> = ({tableHeads, tableBody, handleEdit, handleRemove, popup, popupText, handleConfirmRemove, handleDeclineRemove}: IPageTable) => {
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
                      <button onClick={() => handleEdit(item[1])}>
                        edit
                      </button>
                      <button onClick={() => handleRemove(item[1])}>
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
        popup !== '' &&
        <Popup
          title={`${popupText} ${popup}?`}
          handleYes={() => handleConfirmRemove(popup)}
          handleNo={handleDeclineRemove}
        />
      }
    </div>
  );
}

export default PageTable

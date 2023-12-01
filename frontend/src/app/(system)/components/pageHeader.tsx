import React from 'react';
import { IPageHeader } from '../utils/interfaces';

const PageHeader: React.FC<IPageHeader> = ({textButton, handleAdd, handleInputFilter, handleSelectFilter, options}: IPageHeader) => {
  return (
    <div className="flex gap-12">
      <button onClick={handleAdd}>
        {textButton}
      </button>
      <div className="flex gap-2">
        <input className="text-black" onChange={handleInputFilter} type="text" name="" id="" />
        <select onChange={handleSelectFilter} className="text-black" name="years" id="years">
          {
            options.map((option) => {
              const [text, value] = option;
              return (
                <option key={value} value={value}>{text}</option>
              );
            })
          }
        </select>
      </div>
    </div>
  );
}

export default PageHeader;

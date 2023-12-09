import React from 'react';
import { IPageHeader } from '../utils/interfaces';
import { Search, Users } from '@/app/components/svgs';

const PageHeader: React.FC<IPageHeader> = ({textButton, handleAdd, handleInputFilter, handleSelectFilter, options}: IPageHeader) => {
  return (
    <div className="flex justify-between gap-12 my-4">
      <button className="flex items-center justify-center text-flex-green gap-2 hover:opacity-50" onClick={handleAdd}>
        <Users className="text-2xl" />
        <p className="text-xl">{textButton}</p>
      </button>
      <div className="flex gap-2">
        <div className="flex items-center text-black bg-transparent border border-black rounded-md w-80 text-xl px-1 gap-2">
          <Search className="text-xl" />
          <input className="text-black bg-transparent w-full focus:outline-none" onChange={handleInputFilter} type="text" placeholder="Pesquisar" />
        </div>
        <select onChange={handleSelectFilter} className="text-black bg-transparent border border-black rounded-md w-40 text-xl px-1" name="years" id="years">
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

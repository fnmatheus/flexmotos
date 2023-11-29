'use client'
import React, { useState } from 'react';
import { IPopup } from './utils/interfaces';

const Popup: React.FC<IPopup> = ({title, handleYes, handleNo, hasText, text, hasInput}: IPopup) => {
  const [inputValue, setInputValue] = useState(0);
  
  async function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const value = Number(event.target.value);
    if (value > 0) setInputValue(value);
  }

  return (
    <div>
      <div>
        <h2>{title}</h2>
        { hasText && <p>{text}</p> }
        { hasInput && <input className="text-black" id='input' onChange={handleInput} type="text" /> }
        <div className='flex gap-2'>
          <button onClick={() => handleYes(inputValue)}>
            Yes
          </button>
          <button onClick={handleNo}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;

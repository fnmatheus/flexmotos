'use client'
import React, { useState } from 'react';
import { IPopup } from '../(system)/utils/interfaces';

const Popup: React.FC<IPopup> = ({title, handleYes, handleNo, hasText, text, hasInput}: IPopup) => {
  const [inputValue, setInputValue] = useState(0);
  
  async function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const value = Number(event.target.value);
    if (value > 0) setInputValue(value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleYes(inputValue);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        { title && <h2>{title}</h2> }
        { hasText && <p>{text}</p> }
        { hasInput && <input className="text-black" id='input' onChange={handleInput} type="text" required pattern="\d+.\d\d" /> }
        <div className='flex gap-2'>
          <button type="submit">
            Yes
          </button>
          <button onClick={handleNo}>
            No
          </button>
        </div>
      </form>
    </div>
  );
}

export default Popup;

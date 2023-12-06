'use client'
import React, { useState } from 'react';
import { IPopup } from '../(system)/utils/interfaces';
import { Agree, Decline } from './svgs';

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
    <div className="absolute w-screen h-screen flex justify-center items-center bg-black/40 bottom-0 left-0">
      <form className="flex flex-col gap-4 items-center bg-white text-black p-5" onSubmit={handleSubmit}>
        { title && <h2 className="font-bold text-xl">{title}</h2> }
        { hasText && <p>{text}</p> }
        {
          hasInput &&
          <input className="bg-transparent border-solid border border-black rounded-md text-black h-8 pl-2 w-2/3" id='input' onChange={handleInput} type="text" required pattern="\d+.\d\d" />
        }
        <div className='flex gap-4 justify-center'>
          <button type="submit">
            <Agree className="text-2xl" />
          </button>
          <button onClick={handleNo}>
            <Decline className="text-2xl" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Popup;

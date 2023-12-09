'use client'
import React, { useState } from 'react';
import { IPopup } from '../(system)/utils/interfaces';
import { Agree, Decline } from './svgs';
import { popupButtons, popupContainer, popupInput } from '../utils/classnames';

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
    <div className={`${popupContainer} z-10`}>
      <form className="flex flex-col gap-4 items-center bg-white text-black p-5" onSubmit={handleSubmit}>
        { title && <h2 className="font-bold text-xl">{title}</h2> }
        { hasText && <p>{text}</p> }
        {
          hasInput &&
          <input className={popupInput} id='input' onChange={handleInput} type="text" required pattern="\d+.\d\d" />
        }
        <div className={popupButtons}>
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

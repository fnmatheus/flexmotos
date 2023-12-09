import React, { useState } from 'react';
import { IUsersPopup } from '../../utils/interfaces';
import { hoverPopupButtons, popupButtons, popupContainer, popupInput, popupLabel, popupLabelText } from '@/app/utils/classnames';
import { Agree, Decline } from '@/app/components/svgs';

const UsersPopup: React.FC<IUsersPopup> = ({title, options, handleYes, handleNo, startName, readonlyName, startCategory}: IUsersPopup) => {
  const [name, setName] = useState(startName);
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState(startCategory);

  async function handleName(event: React.ChangeEvent<HTMLInputElement>) {
    const currentName = event.target.value;
    setName(currentName);
  }

  async function handlePassword(event: React.ChangeEvent<HTMLInputElement>) {
    const currentPassword = event.target.value;
    setPassword(currentPassword);
  }

  async function handleCategory(event: React.ChangeEvent<HTMLSelectElement>) {
    const currentCategory = event.target.value;
    setCategory(currentCategory);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleYes({name, password, category});
  }

  return (
    <div className={popupContainer}>
      <form className="bg-white flex flex-col gap-8 p-5" onSubmit={handleSubmit}>
        <div className="flex flex-col text-center text-xl">
          <h2 className="font-semibold">{title}</h2>
          <label className={popupLabel}>
            <span className={popupLabelText}>Usuário</span>
            <input disabled={readonlyName} value={name} onChange={handleName} className={popupInput} type="text" required />
          </label>
          <label className={popupLabel}>
            <span className={popupLabelText}>Senha</span>
            <input onChange={handlePassword} className={popupInput} type="text" />
          </label>
          <label className={popupLabel}>
            <span className={popupLabelText}>Categoria</span>
            <select value={category} onChange={handleCategory} className={popupInput} required>
              {
                options.filter((_option, i) => i !== 0 && i !== 3).map((option) => <option key={option[1]} value={option[1]}>
                    {option[0]}
                  </option>
                )
              }
            </select>
          </label>
        </div>
        <div className={popupButtons}>
          <button className={hoverPopupButtons} type="submit">
            <Agree />
          </button>
          <button className={hoverPopupButtons} onClick={() => handleNo()}>
            <Decline />
          </button>
        </div>
      </form>
    </div>
  );
};

export default UsersPopup;

import React, { useState } from 'react';
import { IUsersPopup } from '../../utils/interfaces';

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

  return (
    <div>
      <div>
        <div className="flex gap-2">
          <h2>{title}</h2>
          <input readOnly={readonlyName} value={name} onChange={handleName} className="text-black" type="text" />
          <input onChange={handlePassword} className="text-black" type="text" />
          <select value={category} onChange={handleCategory} className="text-black">
            {
              options.filter((_option, i) => i !== 0 && i !== 3).map((option) => <option key={option[1]} value={option[1]}>
                  {option[0]}
                </option>
              )
            }
          </select>
        </div>
        <div className="flex gap-2">
          <button onClick={() => handleYes({name, password, category})}>
            Yes
          </button>
          <button onClick={() => handleNo()}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersPopup;

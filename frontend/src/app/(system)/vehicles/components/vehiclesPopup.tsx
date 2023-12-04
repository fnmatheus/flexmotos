import React from 'react';
import { IVehiclesPopup } from '../../utils/interfaces';
import { categories, ipvaOptions } from '../utils/variables';

const VehiclesPopup: React.FC<IVehiclesPopup> = ({title, handleNo}: IVehiclesPopup) => {
  return (
    <div>
      <form>
        <h2>{title}</h2>
        <div className="flex gap-2 flex-wrap">
          <select name="" id="">
            {
              categories.map((item) =>
                <option key={item} value={item}>
                  {item}
                </option>
              )
            }
          </select>
          <input type="text" name="" id="" />
          <input type="text" name="" id="" />
          <input type="text" name="" id="" />
          <input type="text" name="" id="" />
          <select name="" id="">
            {
              ipvaOptions.map((item) =>
                <option key={item[0]} value={item[1]}>
                  {item[0]}
                </option>
              )
            }
          </select>
          <input type="text" name="" id="" />
          <input type="text" name="" id="" />
          <input type="text" name="" id="" />
        </div>
        <div className="flex gap-2">
          <button type="submit">
            Yes
          </button>
          <button onClick={(event) => {
            event.preventDefault();
            handleNo();
          }}>
            No
          </button>
        </div>
      </form>
    </div>
  )
}

export default VehiclesPopup;

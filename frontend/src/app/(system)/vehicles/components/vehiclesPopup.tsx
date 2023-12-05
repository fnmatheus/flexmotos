import React, { useState } from 'react';
import { IVehiclesPopup } from '../../utils/interfaces';
import { categories, ipvaOptions } from '../utils/variables';

const VehiclesPopup: React.FC<IVehiclesPopup> = (
  {title, handleYes, handleNo, vehicleCategory, vehicleModel, vehicleYear, vehiclePlate, vehicleRenavam, vehicleIpva, vehicleMileage, vehiclSecuriteValue, vehicleRentValue, editMode}: IVehiclesPopup
) => {
  const [category, setCategory] = useState<string>(vehicleCategory);
  const [model, setModel] = useState<string>(vehicleModel);
  const [year, setYear] = useState<string>(vehicleYear);
  const [plate, setPlate] = useState<string>(vehiclePlate);
  const [renavam, setRenavam] = useState<string>(vehicleRenavam);
  const [ipva, setIpva] = useState<string>(vehicleIpva);
  const [mileage, setMileage] = useState<string>(vehicleMileage);
  const [securityValue, setSecurityValue] = useState<string>(vehiclSecuriteValue);
  const [rentValue, setRentValue] = useState<string>(vehicleRentValue);

  async function handleCategory(event: React.ChangeEvent<HTMLSelectElement>) {
    const value: string = event.target.value;
    setCategory(value);
  }
  
  async function handleModel(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value;
    setModel(value);
  }

  async function handleYear(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value;
    setYear(value);
  }

  async function handlePlate(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value;
    setPlate(value);
  }

  async function handleRENAVAM(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value;
    setRenavam(value);
  }

  async function handleIPVA(event: React.ChangeEvent<HTMLSelectElement>) {
    const value: string = event.target.value;
    setIpva(value);
  }

  async function handleMileage(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value;
    setMileage(value);
  }

  async function handleSecuritieValue(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value;
    setSecurityValue(value);
  }

  async function handleRentValue(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value;
    setRentValue(value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleYes({category, model, year, plate, RENAVAM: renavam, IPVA: ipva, mileage, securityValue, rentValue});
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{title}</h2>
        <div className="flex gap-2 flex-wrap text-black">
          <select onChange={handleCategory} value={category} required>
            {
              categories.map((item) =>
                <option key={item} value={item}>
                  {item}
                </option>
              )
            }
          </select>
          <input onChange={handleModel} type="text" value={model} required />
          <input onChange={handleYear} type="text" value={year} required pattern="\d\d\d\d/\d\d" />
          <input onChange={handlePlate} type="text" value={plate} required pattern="[A-Z0-9]{7}" readOnly={editMode} />
          <input onChange={handleRENAVAM} type="text" value={renavam} required pattern="\d+" />
          <select onChange={handleIPVA} value={ipva} required>
            {
              ipvaOptions.map((item) =>
                <option key={item[0]} value={item[1]}>
                  {item[0]}
                </option>
              )
            }
          </select>
          <input onChange={handleMileage} type="text" value={mileage} required pattern="\d+.\d\d" />
          <input onChange={handleSecuritieValue} type="text" value={securityValue} required pattern="\d+.\d\d" />
          <input onChange={handleRentValue} type="text" value={rentValue} required pattern="\d+.\d\d" />
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

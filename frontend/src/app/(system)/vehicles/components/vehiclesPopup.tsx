import React, { useState } from 'react';
import { IVehiclesPopup } from '../../utils/interfaces';
import { categories, ipvaOptions } from '../utils/variables';
import { hoverPopupButtons, popupButtons, popupContainer, popupInput, popupLabel, popupLabelText } from '@/app/utils/classnames';
import { Agree, Decline } from '@/app/components/svgs';

const VehiclesPopup: React.FC<IVehiclesPopup> = (
  {title, handleYes, handleNo, vehicleCategory, vehicleModel, vehicleColor, vehicleYear, vehiclePlate, vehicleRenavam, vehicleChassis, vehicleIpva, vehicleMileage, vehicleValue, vehiclSecuriteValue, vehicleRentValue, editMode}: IVehiclesPopup
) => {
  const [category, setCategory] = useState<string>(vehicleCategory);
  const [model, setModel] = useState<string>(vehicleModel);
  const [color, setColor] = useState<string>(vehicleColor);
  const [year, setYear] = useState<string>(vehicleYear);
  const [plate, setPlate] = useState<string>(vehiclePlate);
  const [renavam, setRenavam] = useState<string>(vehicleRenavam);
  const [chassis, setChassis] = useState<string>(vehicleChassis);
  const [ipva, setIpva] = useState<string>(vehicleIpva);
  const [mileage, setMileage] = useState<string>(vehicleMileage);
  const [value, setValue] = useState<string>(vehicleValue);
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

  async function handleColor(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value;
    setColor(value);
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

  async function handleChassis(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value;
    setChassis(value);
  }

  async function handleIPVA(event: React.ChangeEvent<HTMLSelectElement>) {
    const value: string = event.target.value;
    setIpva(value);
  }

  async function handleMileage(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value;
    setMileage(value);
  }

  async function handleVehicleValue(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value;
    setValue(value);
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
    handleYes({category, model, color, year, plate, RENAVAM: renavam, chassis, IPVA: ipva, mileage, vehicleValue: value, securityValue, rentValue});
  }

  return (
    <div className={popupContainer}>
      <form className="bg-white flex flex-col gap-8 p-5 w-2/3 text-xl" onSubmit={handleSubmit}>
        <h2 className="font-semibold text-center">{title}</h2>
        <div className="flex flex-wrap text-black w-full">
          <label className={`${popupLabel} w-2/12`}>
            <span className={popupLabelText}>Categoria</span>
            <select className={popupInput} onChange={handleCategory} value={category} required>
              {
                categories.map((item) =>
                  <option key={item} value={item}>
                    {item}
                  </option>
                )
              }
            </select>
          </label>
          <label className={`${popupLabel} w-3/12`}>
            <span className={popupLabelText}>Modelo</span>
            <input className={popupInput} onChange={handleModel} type="text" value={model} required />
          </label>
          <label className={`${popupLabel} w-3/12`}>
            <span className={popupLabelText}>Cor</span>
            <input className={popupInput} onChange={handleColor} type="text" value={color} required />
          </label>
          <label className={`${popupLabel} w-2/12`}>
            <span className={popupLabelText}>Ano</span>
            <input className={popupInput} onChange={handleYear} type="text" value={year} required pattern="\d\d\d\d/\d\d" />
          </label>
          <label className={`${popupLabel} w-2/12`}>
            <span className={popupLabelText}>Placa</span>
            <input className={popupInput} onChange={handlePlate} type="text" value={plate} required pattern="[A-Z0-9]{7}" disabled={editMode} />
          </label>
          <label className={`${popupLabel} w-3/12`}>
            <span className={popupLabelText}>RENAVAM</span>
            <input className={popupInput} onChange={handleRENAVAM} type="text" value={renavam} required pattern="\d+" />
          </label>
          <label className={`${popupLabel} w-3/12`}>
            <span className={popupLabelText}>Chassi</span>
            <input className={popupInput} onChange={handleChassis} type="text" value={chassis} required />
          </label>
          <label className={`${popupLabel} w-2/12`}>
            <span className={popupLabelText}>IPVA</span>
            <select className={popupInput} onChange={handleIPVA} value={ipva} required>
              {
                ipvaOptions.map((item) =>
                  <option key={item[0]} value={item[1]}>
                    {item[0]}
                  </option>
                )
              }
            </select>
          </label>
          <label className={`${popupLabel} w-2/12`}>
            <span className={popupLabelText}>Quilometragem</span>
            <input className={popupInput} onChange={handleMileage} type="text" value={mileage} required pattern="\d+.\d\d" />
          </label>
          <label className={`${popupLabel} w-2/12`}>
            <span className={popupLabelText}>Tabela Fipe</span>
            <input className={popupInput} onChange={handleVehicleValue} type="text" value={value} required pattern="\d+.\d\d" />
          </label>
          <label className={`${popupLabel} w-2/12`}>
            <span className={popupLabelText}>Caução</span>
            <input className={popupInput} onChange={handleSecuritieValue} type="text" value={securityValue} required pattern="\d+.\d\d" />
          </label>
          <label className={`${popupLabel} w-2/12`}>
            <span className={popupLabelText}>Aluguel</span>
            <input className={popupInput} onChange={handleRentValue} type="text" value={rentValue} required pattern="\d+.\d\d" />
          </label>
        </div>
        <div className={popupButtons}>
          <button className={hoverPopupButtons} type="submit">
            <Agree />
          </button>
          <button className={hoverPopupButtons} onClick={(event) => {
            event.preventDefault();
            handleNo();
          }}>
            <Decline />
          </button>
        </div>
      </form>
    </div>
  )
}

export default VehiclesPopup;

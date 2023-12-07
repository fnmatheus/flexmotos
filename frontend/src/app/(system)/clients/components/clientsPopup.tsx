import React, { useState } from 'react';
import { IClientsPopup } from '../../utils/interfaces';
import { popupButtons, popupContainer, popupInput, popupLabel, popupLabelText } from '@/app/utils/classnames';
import { Agree, Decline } from '@/app/components/svgs';

const ClientsPopup: React.FC<IClientsPopup> = (
  {title, handleYes, handleNo, clientName, clientBirth, clientCPF, clientCNH, clientPhone, clientAdress, editMode}: IClientsPopup
) => {
  const [name, setName] = useState<string | undefined>(clientName);
  const [birth, setBirth] = useState<string | undefined>(clientBirth);
  const [cpf, setCpf] = useState<string | undefined>(clientCPF);
  const [cnh, setCnh] = useState<string | undefined>(clientCNH);
  const [phone, setPhone] = useState<string | undefined>(clientPhone);
  const [address, setAddress] = useState<string | undefined>(clientAdress);
  const [file, setFile] = useState<File | undefined>(undefined);

  async function handleName(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value;
    setName(value);
  }

  async function handleBirth(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = new Date(event.target.value).toLocaleDateString('en-GB', {timeZone: "UTC"});
    setBirth(value);
  }

  async function handleCPF(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value;
    setCpf(value);
  }

  async function handleCNH(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value;
    setCnh(value);
  }

  async function handlePhone(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value;
    setPhone(value);
  }

  async function handleAdress(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value;
    setAddress(value);
  }

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files) setFile(files[0]);
  }

  async function formsSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const client = [name, birth, cpf, cnh, phone, address, file];
    handleYes([...client]);
  }

  return (
    <div className={popupContainer}>
      <form className="bg-white flex flex-col gap-8 p-5 w-2/3" onSubmit={formsSubmit}>
        <div className="flex flex-col gap-4 text-center text-xl">
          <h2 className="font-semibold">{title}</h2>
          <div className="flex text-black flex-wrap">
            <label className={`${popupLabel} w-3/12`}>
              <span className={popupLabelText}>Nome</span>
              <input className={popupInput} onChange={handleName} type="text" value={name} required />
            </label>
            <label className={`${popupLabel} w-2/12`}>
              <span className={popupLabelText}>Data de nascimento</span>
              <input className={popupInput} onChange={handleBirth} type="date" value={
                (birth)
                  ? birth.split('/').reverse().join('-')
                  : ''
              } required />
            </label>
            <label className={`${popupLabel} w-3/12`}>
              <span className={popupLabelText}>CPF</span>
              <input className={popupInput} onChange={handleCPF} type="text" readOnly={editMode} value={cpf} required pattern="\d\d\d.\d\d\d.\d\d\d-\d\d" />
            </label>
            <label className={`${popupLabel} w-3/12`}>
              <span className={popupLabelText}>CNH</span>
              <input className={popupInput} onChange={handleCNH} type="text" readOnly={editMode} value={cnh} required pattern="\d+" />
            </label>
            <label className={`${popupLabel} w-2/12`}>
              <span className={popupLabelText}>Telefone</span>
              <input className={popupInput} onChange={handlePhone} type="text" value={phone} required pattern="\d\d \d\d\d\d\d-\d\d\d\d|\d\d \d\d\d\d-\d\d\d\d" />
            </label>
            <label className={`${popupLabel} w-9/12`}>
              <span className={popupLabelText}>Endereço</span>
              <input className={popupInput} onChange={handleAdress} type="text" value={address} required />
            </label>
            <input className="p-1" onChange={handleFile} type="file" accept=".doc,.docx,.pdf,.jpg,.png" />
          </div>
        </div>
        <div className={popupButtons}>
          <button type="submit">
            <Agree />
          </button>
          <button onClick={(event) => {
            event.preventDefault();
            handleNo();
            }
          }>
            <Decline />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ClientsPopup;

import React, { useState } from 'react';
import { IClientsPopup } from '../../utils/interfaces';
import { popupContainer } from '@/app/utils/classnames';

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
      <form onSubmit={formsSubmit}>
        <h2>{title}</h2>
        <div className="flex gap-2 text-black flex-wrap">
          <input onChange={handleName} type="text" value={name} required />
          <input onChange={handleBirth} type="date" value={
            (birth)
              ? birth.split('/').reverse().join('-')
              : ''
          } required />
          <input onChange={handleCPF} type="text" readOnly={editMode} value={cpf} required pattern="\d\d\d.\d\d\d.\d\d\d-\d\d" />
          <input onChange={handleCNH} type="text" readOnly={editMode} value={cnh} required pattern="\d+" />
          <input onChange={handlePhone} type="text" value={phone} required pattern="\d\d \d\d\d\d\d-\d\d\d\d|\d\d \d\d\d\d-\d\d\d\d" />
          <input onChange={handleAdress} type="text" value={address} required />
          <input onChange={handleFile} type="file" accept=".doc,.docx,.pdf,.jpg,.png" />
        </div>
        <div className="flex gap-2">
          <button type="submit">
            Yes
          </button>
          <button onClick={(event) => {
            event.preventDefault();
            handleNo();
            }
          }>
            No
          </button>
        </div>
      </form>
    </div>
  );
}

export default ClientsPopup;

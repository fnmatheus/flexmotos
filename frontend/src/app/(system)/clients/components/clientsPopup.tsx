import React, { useState } from 'react';
import { IClientsPopup } from '../../utils/interfaces';

const ClientsPopup: React.FC<IClientsPopup> = ({title, handleYes, handleNo}: IClientsPopup) => {
  const [name, setName] = useState<string>('');
  const [birth, setBirth] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [cnh, setCnh] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [adress, setAdress] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  async function handleName(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value;
    setName(value);
  }

  async function handleBirth(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = new Date(event.target.value).toLocaleDateString('en-GB');
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
    setAdress(value);
  }

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files) setFile(files[0]);
  }

  return (
    <div>
      <div>
        <h2>{title}</h2>
        <div className="flex gap-2 text-black flex-wrap">
          <input onChange={handleName} type="text" id="name" />
          <input onChange={handleBirth} type="date" id="birth" />
          <input onChange={handleCPF} type="text" id="CPF" />
          <input onChange={handleCNH} type="text" id="CNH" />
          <input onChange={handlePhone} type="text" id="phone" />
          <input onChange={handleAdress} type="text" id="address" />
          <input onChange={handleFile} type="file" id="file" accept=".doc,.docx,.pdf,.jpg,.png" />
        </div>
        <div className="flex gap-2">
          <button onClick={() => {
            const client = [name, birth, cpf, cnh, phone, adress, file];
            handleYes([...client]);
          }}>
            Yes
          </button>
          <button onClick={() => handleNo()}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClientsPopup;

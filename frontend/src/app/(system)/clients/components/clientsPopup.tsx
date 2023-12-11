import React, { useState } from 'react';
import { IClientsPopup } from '../../utils/interfaces';
import { hoverPopupButtons, popupButtons, popupContainer, popupInput, popupLabel, popupLabelText } from '@/app/utils/classnames';
import { Agree, Decline } from '@/app/components/svgs';
import { maritalOptions } from '../utils/variables';

const ClientsPopup: React.FC<IClientsPopup> = (
  {title, handleYes, handleNo, clientName, clientBirth, clientCPF, clientCNH, clientPhone, clientAdress, clientRg, clientNationality, clientJob, clientMaritalStatus, clientIsMarid, clientPartnerName, editMode}: IClientsPopup
) => {
  const [name, setName] = useState<string | undefined>(clientName);
  const [birth, setBirth] = useState<string | undefined>(clientBirth);
  const [cpf, setCpf] = useState<string | undefined>(clientCPF);
  const [cnh, setCnh] = useState<string | undefined>(clientCNH);
  const [phone, setPhone] = useState<string | undefined>(clientPhone);
  const [address, setAddress] = useState<string | undefined>(clientAdress);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [rg, setRg] = useState<string | undefined>(clientRg);
  const [nationality, setNationality] = useState<string | undefined>(clientNationality);
  const [job, setJob] = useState<string | undefined>(clientJob);
  const [maritalStatus, setMaritalStatus] = useState<string | undefined>(clientMaritalStatus);
  const [isMaried, setIsMaried] = useState<boolean | undefined>(clientIsMarid);
  const [partnerName, setPartnerName] = useState<string | undefined>(clientPartnerName);

  async function handleName(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value;
    setName(value);
  }

  async function handleBirth(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = new Date(event.target.value).toLocaleDateString('en-GB', {timeZone: "UTC"});
    setBirth(value);
  }

  async function handleCpf(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value;
    setCpf(value);
  }

  async function handleCnh(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value;
    setCnh(value);
  }

  async function handleRg(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value;
    setRg(value);
  }

  async function handleNationality(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value;
    setNationality(value);
  }

  async function handleJob(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value;
    setJob(value);
  }

  async function handleMaritalStatus(event: React.ChangeEvent<HTMLSelectElement>) {
    const value: string = event.target.value;
    if (value === 'casado(a)') setIsMaried(true);
    else {
      setIsMaried(false);
      setPartnerName('');
    }
    setMaritalStatus(value);
  }

  async function handlePartnerName(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = event.target.value;
    setPartnerName(value);
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
    const client = [name, birth, cpf, cnh, rg, nationality, job, maritalStatus, partnerName, phone, address, file];
    handleYes([...client]);
  }

  return (
    <div className={popupContainer}>
      <form className="bg-white flex flex-col gap-8 p-5 w-2/3 text-xl" onSubmit={formsSubmit}>
        <h2 className="font-semibold text-center">{title}</h2>
        <div className="flex text-black flex-wrap">
          <label className={`${popupLabel} w-4/12`}>
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
            <input className={popupInput} onChange={handleCpf} type="text" disabled={editMode} value={cpf} required pattern="\d\d\d.\d\d\d.\d\d\d-\d\d" />
          </label>
          <label className={`${popupLabel} w-3/12`}>
            <span className={popupLabelText}>CNH</span>
            <input className={popupInput} onChange={handleCnh} type="text" value={cnh} required pattern="\d+" />
          </label>
          <label className={`${popupLabel} w-3/12`}>
            <span className={popupLabelText}>RG</span>
            <input className={popupInput} onChange={handleRg} type="text" value={rg} required pattern="\w\w\d+" />
          </label>
          <label className={`${popupLabel} w-2/12`}>
            <span className={popupLabelText}>Nacionalidade</span>
            <input className={popupInput} onChange={handleNationality} type="text" value={nationality} required />
          </label>
          <label className={`${popupLabel} w-2/12`}>
            <span className={popupLabelText}>Emprego</span>
            <input className={popupInput} onChange={handleJob} type="text" value={job} required />
          </label>
          <label className={`${popupLabel} w-5/12`}>
            <span className={popupLabelText}>Estado cívil</span>
            <div className="flex w-full">
              <div className="w-7/12 mr-2">
                <select className={popupInput} onChange={handleMaritalStatus} value={maritalStatus} required>
                  {
                    maritalOptions.map((item) =>
                      <option key={item} value={item}>
                        {item}
                      </option>
                    )
                  }
                </select>
              </div>
              <div className="w-full">
                <input className={popupInput} onChange={handlePartnerName} type="text" disabled={!isMaried} value={partnerName} required />
              </div>
            </div>
          </label>
          <label className={`${popupLabel} w-2/12`}>
            <span className={popupLabelText}>Telefone</span>
            <input className={popupInput} onChange={handlePhone} type="text" value={phone} required pattern="\d\d \d\d\d\d\d-\d\d\d\d|\d\d \d\d\d\d-\d\d\d\d" />
          </label>
          <label className={`${popupLabel} w-10/12`}>
            <span className={popupLabelText}>Endereço</span>
            <input className={popupInput} onChange={handleAdress} type="text" value={address} required />
          </label>
          <input className="p-1" onChange={handleFile} type="file" accept=".doc,.docx,.pdf,.jpg,.png" />
        </div>
        <div className={popupButtons}>
          <button className={hoverPopupButtons} type="submit">
            <Agree />
          </button>
          <button className={hoverPopupButtons} onClick={(event) => {
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

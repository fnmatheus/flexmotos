import React, { useEffect, useState } from 'react';
import { IRentPopup } from '../../utils/interfaces';
import { getClients } from '../../clients/utils/clientsAxios';
import { securityOptions } from '../utils/variables';
import dateDifference from '../../utils/dateDifference';
import { hoverPopupButtons, popupButtons, popupContainer, popupInput, popupLabel, popupLabelText } from '@/app/utils/classnames';
import { Agree, Decline } from '@/app/components/svgs';

const RentPopup: React.FC<IRentPopup> = ({ plate, handleNo, handleYes }: IRentPopup) => {
  const [clients, setClients] = useState<string[][]>([]);
  const [clientValue, setClientValue] = useState<string[]>(clients[0]);
  const [rentalDate, setRentalDate] = useState<string | undefined>('');
  const [returnDate, setReturnDate] = useState<string | undefined>('');
  const [security, setSecurity] = useState<string>('true');

  useEffect(() => {
    async function getData() {
      const clients = await getClients();
      const clientsInfo = clients.map((client, index) => {
        if (index === 1) setClientValue(client);
        const [name, CPF] = client;
        return [name, CPF];
      });
      setClients(clientsInfo);
      setClientValue(clientsInfo[0]);
    }
    getData();
  }, []);

  async function handleSecurity(event: React.ChangeEvent<HTMLSelectElement>) {
    const value: string = event.target.value;
    setSecurity(value);
  }

  async function handleClient(event: React.ChangeEvent<HTMLSelectElement>) {
    const value: string = event.target.value;
    setClientValue(value.split(','));
  }

  async function handleRentalDate(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = new Date(event.target.value).toLocaleDateString('en-GB', {timeZone: "UTC"});
    setRentalDate(value);
  }

  async function handleReturnDate(event: React.ChangeEvent<HTMLInputElement>) {
    const value: string = new Date(event.target.value).toLocaleDateString('en-GB', {timeZone: "UTC"});
    setReturnDate(value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const [name, CPF] = clientValue;
    if (rentalDate && returnDate) {
      const difference = dateDifference(rentalDate, returnDate);
      if (difference > 0) {
        handleYes({CPF, name, plate, rentalDate, returnDate, security});
        return;
      }
    }
    alert('Datas inválidas');
  }

  return (
    <div className={popupContainer}>
      <form className="bg-white flex flex-col w-1/3 gap-8 p-5 text-xl" onSubmit={handleSubmit}>
        <h2 className="font-semibold text-center">{`Alugar o veículo ${plate}`}</h2>
        <div className="flex flex-wrap text-black w-full">
          <label className={`${popupLabel} w-full`}>
            <span className={popupLabelText}>Cliente</span>
            <select className={popupInput} onChange={handleClient} value={clientValue}>
              {
                clients.map((client) =>{
                  const [name, CPF] = client;
                  return (
                    <option key={CPF} value={client}>
                      {`${name} ${CPF}`}
                    </option>
                  )
                })
              }
            </select>
          </label>
          <label className={`${popupLabel} w-12/12`}>
            <span className={popupLabelText}>Data do aluguel</span>
            <input className={popupInput} type="date" onChange={handleRentalDate} value={
              (rentalDate)
                ? rentalDate.split('/').reverse().join('-')
                : ''
            } required />
          </label>
          <label className={`${popupLabel} w-12/12`}>
            <span className={popupLabelText}>Data de retorno</span>
            <input className={popupInput} type="date" onChange={handleReturnDate} value={
              (returnDate)
                ? returnDate.split('/').reverse().join('-')
                : ''
            } required />
          </label>
          <label className={`${popupLabel} w-12/12`}>
            <span className={popupLabelText}>Caução</span>
            <select className={popupInput} onChange={handleSecurity} value={security}>
              {
                securityOptions.map((item) =>
                  <option key={item[0]} value={item[1]}>
                    {item[0]}
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
          <button className={hoverPopupButtons} onClick={handleNo}>
            <Decline />
          </button>
        </div>
      </form>
    </div>
  );
}

export default RentPopup;

import React, { useEffect, useState } from 'react';
import { IRentPopup } from '../../utils/interfaces';
import { getClients } from '../../clients/utils/clientsAxios';
import { securityOptions } from '../utils/variables';
import dateDifference from '../../utils/dateDifference';

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
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{`Alugar o veículo ${plate}`}</h2>
        <div className="flex gap-2 flex-wrap text-black">
          <select onChange={handleClient} value={clientValue}>
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
          <input type="date" onChange={handleRentalDate} value={
            (rentalDate)
              ? rentalDate.split('/').reverse().join('-')
              : ''
          } required />
          <input type="date" onChange={handleReturnDate} value={
            (returnDate)
              ? returnDate.split('/').reverse().join('-')
              : ''
          } required />
          <select onChange={handleSecurity} value={security}>
            {
              securityOptions.map((item) =>
                <option key={item[0]} value={item[1]}>
                  {item[0]}
                </option>
              )
            }
          </select>
        </div>
        <div className="flex gap-2">
          <button type="submit">
            Yes
          </button>
          <button onClick={handleNo}>
            No
          </button>
        </div>
      </form>
    </div>
  );
}

export default RentPopup;

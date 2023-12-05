import React, { useEffect, useState } from 'react';
import { IRentPopup } from '../../utils/interfaces';
import { getClients } from '../../clients/utils/clientsAxios';
import { securityOptions } from '../utils/variables';

const RentPopup: React.FC<IRentPopup> = ({ plate, handleNo }: IRentPopup) => {
  const [clients, setClients] = useState<string[][]>([]);
  const [clientValue, setClientValue] = useState<string[]>([]);
  const [rentalDate, setRentalDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');
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
    }
    getData();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  async function handleSecurity(event: React.ChangeEvent<HTMLSelectElement>) {
    const value: string = event.target.value;
    setSecurity(value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{`Alugar o veículo ${plate}`}</h2>
        <div className="flex gap-2 flex-wrap text-black">
          <select>
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
          <input type="date" />
          <input type="date" />
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

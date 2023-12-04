import React, { useEffect, useState } from 'react';
import { IClientDetailsPopup } from '../../utils/interfaces';
import { clientDownload, getClientDetails } from '../utils/clientsAxios';

const ClientDetailsPopup: React.FC<IClientDetailsPopup> = ({detailsCpf, handleClose}: IClientDetailsPopup) => {
  const [name, setName] = useState<string>('');
  const [birth, setBirth] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [cnh, setCnh] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [history, setHistory] = useState<string[][]>([]);
  const [securities, setSecurities] = useState<string[][]>([]);

  useEffect(() => {
    async function getDetails() {
      const client = await getClientDetails(detailsCpf);
      setName(client.name);
      setBirth(client.birth);
      setCpf(client.CPF);
      setCnh(client.CNH);
      setPhone(client.phone);
      setAddress(client.address);
      setHistory(client.history);
      setSecurities(client.securities);
    }
    getDetails();
  }, [detailsCpf]);

  async function handleDownload(cpf: string) {
    await clientDownload(cpf);
  }

  return (
    <div>
      <div>
        <div>
          <button onClick={handleClose}>
            close
          </button>
        </div>
        <div>
          <h2>Informações do cliente</h2>
          <div>
            <p>{name}</p>
            <p>{birth}</p>
            <p>{cpf}</p>
            <p>{cnh}</p>
            <p>{phone}</p>
            <p>{address}</p>
            <button onClick={() => handleDownload(cpf)}>
              Baixar comprovante
            </button>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Histórico de aluguel</th>
                </tr>
              </thead>
              <tbody>
                {
                  history.map((item) => {
                    const [model, plate, rentalDate] = item;
                    return (<tr key={plate}>
                      <td className="flex gap-2">
                        <p>{model}</p>
                        <p>{plate}</p>
                        <p>{rentalDate}</p>
                      </td>
                    </tr>);
                  })
                }
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <th>Cauções</th>
                </tr>
              </thead>
              <tbody>
                {
                  securities.map((securitie) => {
                    const [plate, value] = securitie;
                    const securitieValue = `R$ ${Number(value).toFixed(2)}`
                    return (<tr key={plate}>
                      <td className="flex gap-2">
                        <p>{plate}</p>
                        <p>{securitieValue}</p>
                      </td>
                    </tr>);
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDetailsPopup;

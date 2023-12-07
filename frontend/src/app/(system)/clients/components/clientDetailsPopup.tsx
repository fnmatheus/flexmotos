import React, { useEffect, useState } from 'react';
import { IClientDetailsPopup } from '../../utils/interfaces';
import { clientDownload, getClientDetails } from '../utils/clientsAxios';
import { pageTableButton, pageTableButtonIndigo, popupContainer, popupLabelText } from '@/app/utils/classnames';
import { Decline } from '@/app/components/svgs';

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
    <div className={popupContainer}>
      <div className="bg-white flex flex-col gap-8 p-5 relative">
        <button className="absolute top-1 right-1 text-xl" onClick={handleClose}>
          <Decline />
        </button>
        <div className="flex flex-col gap-2 text-xl">
          <h2 className="font-semibold text-center">Informações do cliente</h2>
          <div className="flex flex-wrap justify-start">
            <label className="w-full text-left p-1">
              <span className={popupLabelText}>Nome</span>
              <p>{name}</p>
            </label>
            <label className="w-3/12 text-left p-1">
              <span className={popupLabelText}>Data de nascimento</span>
              <p>{birth}</p>
            </label>
            <label className="w-3/12 text-left p-1">
              <span className={popupLabelText}>CPF</span>
              <p>{cpf}</p>
            </label>
            <label className="w-3/12 text-left p-1">
              <span className={popupLabelText}>CNH</span>
              <p>{cnh}</p>
            </label>
            <label className="w-3/12 text-left p-1">
              <span className={popupLabelText}>Telefone</span>
              <p>{phone}</p>
            </label>
            <label className="w-full text-left p-1">
              <span className={popupLabelText}>Endereço</span>
              <p>{address}</p>
            </label>
            <button className="text-center p-1 border rounded-md text-xl bg-indigo-700 text-white border-indigo-700 hover:bg-transparent hover:text-indigo-700" onClick={() => handleDownload(cpf)}>
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

import React, { useEffect, useState } from 'react';
import { IClientDetailsPopup } from '../../utils/interfaces';
import { getClientDetails } from '../utils/clientsAxios';

const ClientDetailsPopup: React.FC<IClientDetailsPopup> = ({detailsCpf, handleClose}: IClientDetailsPopup) => {
  const [name, setName] = useState<string>('');
  const [birth, setBirth] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [cnh, setCnh] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    async function getDetails() {
      const client = await getClientDetails(detailsCpf);
      setName(client.name);
      setBirth(client.birth);
      setCpf(client.CPF);
      setCnh(client.CNH);
      setPhone(client.phone);
      setAddress(client.address);
    }
    getDetails();
  }, [detailsCpf]);

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
            <button>
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
            </table>
            <table>
              <thead>
                <tr>
                  <th>Cauções</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDetailsPopup;

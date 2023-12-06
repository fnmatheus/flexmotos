'use client';
import React, { useEffect, useState } from 'react';
import PageHeader from '../components/pageHeader';
import PageTable from '../components/pageTable';
import { options, tableHeads } from './utils/variables';
import { getCookie } from 'cookies-next';
import { addNewClient, filterClientsByStatus, getClientDetails, getClients, removeClient, updateClient } from './utils/clientsAxios';
import ClientsPopup from './components/clientsPopup';
import ClientDetailsPopup from './components/clientDetailsPopup';
import { IClient } from '../utils/interfaces';

const Clients = () => {
  const [clients, setClients] = useState<string[][]>([]);
  const [filteredClients, setFilteredClients] = useState<string[][]>([]);
  const [popup, setPopup] = useState<string[]>(['', '']);
  const [addPopup, setAddPopup] = useState(false);
  const [editPopup, setEditPopup] = useState<string[]>([]);
  const [detailsPopup, setDetailsPopup] = useState<string>('');

  useEffect(() => {
    async function getClientsData() {
      await getCookie('authorization');
      const data = await getClients();
      setClients(data);
    }
    getClientsData();
  }, []);

  useEffect(() => {
    setFilteredClients(clients);
  }, [popup, clients]);

  async function handleSelectFilter(event: React.ChangeEvent<HTMLSelectElement>) {
    const category = (event.target.value);
    const data = await filterClientsByStatus(category);
    setClients(data);
  }

  async function handleInputFilter(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.value;
    const filter = clients.filter((client) => client[0].includes(name));
    setFilteredClients(filter);
  }
  
  async function handleConfirmRemove(CPF: string) {
    const newClients = await removeClient(CPF);
    setClients(newClients);
    setPopup(['']);
  }
  
  async function handleAddClient(client: (string | File | undefined)[]) {
    const newClients = await addNewClient(client);
    if (!newClients) {
      alert('Campos inválidos!');
      return;
    }
    setClients(newClients);
    setAddPopup(false);
  }

  async function handleSetEditPopup(clientCPF: string) {
    const clientDetails: IClient = await getClientDetails(clientCPF);
    const {name, birth, CPF, CNH, phone, address} = clientDetails;
    setEditPopup([name, birth, CPF, CNH, phone, address]);
  }

  async function handleEditClient(client: (string | File | undefined)[]) {
    const newClients = await updateClient(client);
    if (!newClients) {
      alert('Campos inválidos!');
      return;
    }
    setClients(newClients);
    setEditPopup([]);
  }

  async function handleDetails(CPF: string) {
    setDetailsPopup(CPF);
  }

  return (
    <section className="m-5">
      <PageHeader
        textButton='Adicionar novo cliente'
        handleAdd={() => setAddPopup(true)}
        handleInputFilter={handleInputFilter}
        handleSelectFilter={handleSelectFilter}
        options={options}
      />
      <PageTable
        tableHeads={tableHeads}
        tableBody={filteredClients}
        handleEdit={(CPF) => handleSetEditPopup(CPF)}
        handleRemove={([CPF, name]) => setPopup([CPF, name])}
        popup={popup}
        popupText='Tem certeza que deseja excluir o cliente:'
        handleConfirmRemove={(CPF) => handleConfirmRemove(CPF)}
        handleDeclineRemove={() => setPopup([''])}
        hasDetails
        handleDetails={(CPF) => handleDetails(CPF)}
      />
      {
        addPopup &&
        <ClientsPopup
          title="Adicionar cliente"
          handleYes={(client) => handleAddClient(client)}
          handleNo={() => setAddPopup(false)}
          clientName=''
          clientBirth=''
          clientCPF=''
          clientCNH=''
          clientPhone=''
          clientAdress=''
        />
      }
      {
        editPopup.length > 0 &&
        <ClientsPopup
          title="Alterar cliente"
          handleYes={(client) => handleEditClient(client)}
          handleNo={() => setEditPopup([])}
          clientName={editPopup[0]}
          clientBirth={editPopup[1]}
          clientCPF={editPopup[2]}
          clientCNH={editPopup[3]}
          clientPhone={editPopup[4]}
          clientAdress={editPopup[5]}
          editMode
        />
      }
      {
        detailsPopup !== '' &&
        <ClientDetailsPopup
          detailsCpf={detailsPopup}
          handleClose={() => setDetailsPopup('')}
        />
      }
    </section>
  );
}

export default Clients;

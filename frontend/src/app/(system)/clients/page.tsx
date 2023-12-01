'use client';
import React, { useEffect, useState } from 'react';
import PageHeader from '../components/pageHeader';
import PageTable from '../components/pageTable';
import { options, tableHeads } from './utils/variables';
import { getCookie } from 'cookies-next';
import { filterClientsByStatus, getClients, removeClient } from './utils/clientsAxios';

const Clients = () => {
  const [clients, setClients] = useState<string[][]>([]);
  const [filteredClients, setFilteredClients] = useState<string[][]>([]);
  const [popup, setPopup] = useState<string[]>(['', '']);
  const [addPopup, setAddPopup] = useState(false);
  const [editPopup, setEditPopup] = useState<string[]>([]);

  useEffect(() => {
    async function getToken() {
      await getCookie('authorization');
      const data = await getClients();
      setClients(data);
    }
    getToken();
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
  
  async function handleSetEditPopup(CPF: string) {
    setEditPopup([CPF, CPF]);
  }

  return (
    <section>
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
      />
      {
        addPopup &&
        <div>Add Popup</div>
      }
      {
        editPopup.length > 1 &&
        <div>Edit Popup</div>
      }
    </section>
  );
}

export default Clients;

'use client';
import React, { useEffect, useState } from 'react';
import PageHeader from '../components/pageHeader';
import PageTable from '../components/pageTable';
import { options, tableHeads } from './utils/variables';
import { getCookie } from 'cookies-next';
import { getClients } from './utils/clientsAxios';

const Clients = () => {
  const [clients, setClients] = useState<string[][]>([]);
  const [filteredClients, setFilteredClients] = useState<string[][]>([]);
  const [popup, setPopup] = useState<string>('');
  const [editPopup, setEditPopup] = useState<string[]>([]);
  const [addPopup, setAddPopup] = useState(false);

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
    // const category = (event.target.value);
    // const data = await filterUsersByCategory(category);
    // setUsers(data);
    console.log(event.target.value);
  }

  async function handleInputFilter(event: React.ChangeEvent<HTMLInputElement>) {
    // const name = event.target.value;
    // const filter = users.filter((user) => user[1].includes(name));
    // setFilteredUsers(filter);
    console.log(event.target.value);
  }

  async function handleConfirmRemove(CPF: string) {
    console.log(CPF);
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
        handleEdit={([]) => setEditPopup([])}
        handleRemove={(name) => setPopup(name)}
        popup={popup}
        popupText='Tem certeza que deseja excluir o cliente com CPF:'
        handleConfirmRemove={(CPF) => handleConfirmRemove(CPF)}
        handleDeclineRemove={() => setPopup('')}
      />
    </section>
  );
}

export default Clients;

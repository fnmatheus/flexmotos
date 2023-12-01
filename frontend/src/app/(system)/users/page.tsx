'use client';
import React, { useEffect, useState } from 'react';
import PageHeader from '../components/pageHeader';
import { options, tableHeads } from './utils/variables';
import { getUsers, removeUser } from './utils/usersAxios';
import Popup from '../components/popup';
import PageTable from '../components/pageTable';

const Users = () => {
  const [users, setUsers] = useState<string[][]>([]);
  const [popup, setPopup] = useState<string>('');
  const [editPopup, setEditPopup] = useState<string[]>([]);

  useEffect(() => {
    async function getUsersData() {
      const data = await getUsers();
      setUsers(data);
    }
    getUsersData();
  }, [popup])

  async function handleSelectFilter(event: React.ChangeEvent<HTMLSelectElement>) {
    console.log(event.target.value);
  }

  async function handleInputFilter(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
  }

  async function handleConfirmRemove(name: string) {
    await removeUser(name);
    setPopup('');
  }

  return (
    <section>
      <PageHeader
        textButton='Adicionar novo usuário'
        handleInputFilter={handleInputFilter}
        handleSelectFilter={handleSelectFilter}
        options={options}
      />
      <PageTable
        tableHeads={tableHeads}
        tableBody={users}
        handleEdit={([name, category]) => setEditPopup([name, category])}
        handleRemove={(name) => setPopup(name)}
        popup={popup}
        handleConfirmRemove={(name) => handleConfirmRemove(name)}
        handleDeclineRemove={() => setPopup('')}
      />
    </section>
  );
}

export default Users;

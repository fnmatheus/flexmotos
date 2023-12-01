'use client';
import React, { useEffect, useState } from 'react';
import PageHeader from '../components/pageHeader';
import { options, tableHeads } from './utils/variables';
import { getUsers, removeUser, filterUsersByCategory } from './utils/usersAxios';
import PageTable from '../components/pageTable';
import UsersPopup from './components/usersPopup';
import { IHandleAddUser } from '../utils/interfaces';

const Users = () => {
  const [users, setUsers] = useState<string[][]>([]);
  const [filteredUsers, setFilteredUsers] = useState<string[][]>([]);
  const [popup, setPopup] = useState<string>('');
  const [addPopup, setAddPopup] = useState(false);
  const [editPopup, setEditPopup] = useState<string[]>([]);

  useEffect(() => {
    async function getUsersData() {
      const data = await getUsers();
      setUsers(data);
    }
    getUsersData();
  }, []);

  useEffect(() => {
    setFilteredUsers(users);
  }, [popup, users]);

  async function handleSelectFilter(event: React.ChangeEvent<HTMLSelectElement>) {
    const category = (event.target.value);
    const data = await filterUsersByCategory(category);
    setUsers(data);
  }

  async function handleInputFilter(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.value;
    const filter = users.filter((user) => user[1].includes(name));
    setFilteredUsers(filter);
  }

  async function handleConfirmRemove(name: string) {
    await removeUser(name);
    setPopup('');
  }

  async function handleAddUser({name, password, category}: IHandleAddUser) {
    if (!name || !password) {
      alert('Preencha os campos incompletos!');
      return;
    }
    console.log(name, password, category);
  }

  return (
    <section>
      <PageHeader
        textButton='Adicionar novo usuário'
        handleAdd={() => setAddPopup(true)}
        handleInputFilter={handleInputFilter}
        handleSelectFilter={handleSelectFilter}
        options={options}
      />
      <PageTable
        tableHeads={tableHeads}
        tableBody={filteredUsers}
        handleEdit={([name, category]) => setEditPopup([name, category])}
        handleRemove={(name) => setPopup(name)}
        popup={popup}
        handleConfirmRemove={(name) => handleConfirmRemove(name)}
        handleDeclineRemove={() => setPopup('')}
      />
      {
        addPopup &&
        <UsersPopup
          title='Novo usuário'
          options={options}
          handleYes={handleAddUser}
          handleNo={() => setAddPopup(false)}
          startCategory='user'
        />
      }
    </section>
  );
}

export default Users;

'use client';
import React, { useEffect, useState } from 'react';
import PageHeader from '../components/pageHeader';
import { options, tableHeads } from './utils/variables';
import { getUsers, removeUser, filterUsersByCategory, addUser, updateUser, getUserByName } from './utils/usersAxios';
import PageTable from '../components/pageTable';
import UsersPopup from './components/usersPopup';
import { IUser } from '../utils/interfaces';
import { getCookie } from 'cookies-next';

const Users = () => {
  const [users, setUsers] = useState<string[][]>([]);
  const [filteredUsers, setFilteredUsers] = useState<string[][]>([]);
  const [popup, setPopup] = useState<string[]>(['']);
  const [addPopup, setAddPopup] = useState(false);
  const [editPopup, setEditPopup] = useState<string[]>([]);

  useEffect(() => {
    async function getToken() {
      await getCookie('authorization');
      const data = await getUsers();
      setUsers(data);
    }
    getToken();
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
    const newUsers = await removeUser(name);
    if (!newUsers) {
      alert('Usuário não possui permissão para deletar outros usuários!');
      setPopup(['']);
      return;
    }
    setUsers(newUsers);
    setPopup(['']);
  }

  async function handleAddUser({name, password, category}: IUser) {
    if (!name || !password) {
      alert('Preencha os campos incompletos!');
      return;
    }
    const newUsers = await addUser({name, password, category});
    if (!newUsers) {
      alert('Usuário já cadastrado com o mesmo nome ou este usuário não possui permissão para cadastrar novos usuários!');
      return;
    }
    setUsers(newUsers);
    setAddPopup(false);
  }
  
  async function handleSetEditPopup(name: string) {
    const data = await getUserByName(name);
    setEditPopup(data);
  }

  async function handleEditUser({name, password, category}: IUser) {
    const newUsers = await updateUser({name, password, category});
    if (!newUsers) {
      alert('Usuário não possui permissão para alterar usuários!');
      setEditPopup([]);
      return;
    }
    setUsers(newUsers);
    setEditPopup([]);
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
        handleEdit={(name) => handleSetEditPopup(name)}
        handleRemove={([name]) => setPopup([name, name])}
        popup={popup}
        popupText='Tem certeza que deseja excluir o usuário:'
        handleConfirmRemove={(name) => handleConfirmRemove(name)}
        handleDeclineRemove={() => setPopup([''])}
      />
      {
        addPopup &&
        <UsersPopup
          title="Novo usuário"
          options={options}
          handleYes={handleAddUser}
          handleNo={() => setAddPopup(false)}
          startName=''
          readonlyName={false}
          startCategory="user"
        />
      }
      {
        editPopup.length > 1 &&
        <UsersPopup
          title="Alterar usuário"
          options={options}
          handleYes={handleEditUser}
          handleNo={() => setEditPopup([])}
          startName={editPopup[0]}
          readonlyName
          startCategory={editPopup[1]}
        />
      }
    </section>
  );
}

export default Users;

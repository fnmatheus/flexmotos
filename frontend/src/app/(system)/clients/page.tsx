'use client';
import React, { useState } from 'react';
import PageHeader from '../components/pageHeader';
import PageTable from '../components/pageTable';
import { options } from './utils/variables';

const Clients = () => {
  const [addPopup, setAddPopup] = useState(false);

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

  return (
    <section>
      <PageHeader
        textButton='Adicionar novo cliente'
        handleAdd={() => setAddPopup(true)}
        handleInputFilter={handleInputFilter}
        handleSelectFilter={handleSelectFilter}
        options={options}
      />
    </section>
  );
}

export default Clients;

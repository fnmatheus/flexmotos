'use client';
import React, { useEffect } from 'react';
import PageHeader from '../components/pageHeader';
import { options, tableHeads } from './utils/variables';

const Users = () => {
  useEffect(() => {}, [])

  async function handleSelectFilter(event: React.ChangeEvent<HTMLSelectElement>) {
    console.log(event.target.value);
  }

  async function handleInputFilter(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
  }

  return (
    <section>
      <PageHeader
        textButton='Adicionar novo usuário'
        handleInputFilter={handleInputFilter}
        handleSelectFilter={handleSelectFilter}
        options={options}
      />
      <table>
        <thead>
          {
            tableHeads.map((text) => <td key={text}>
              <th>{text}</th>
            </td>)
          }
        </thead>
        <tbody>
        </tbody>
      </table>
    </section>
  );
}

export default Users;

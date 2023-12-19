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
import { useRouter } from 'next/navigation';

const Clients = () => {
  const [clients, setClients] = useState<string[][]>([]);
  const [filteredClients, setFilteredClients] = useState<string[][]>([]);
  const [popup, setPopup] = useState<string[]>(['', '']);
  const [addPopup, setAddPopup] = useState(false);
  const [editPopup, setEditPopup] = useState<(string)[]>([]);
  const [detailsPopup, setDetailsPopup] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    async function getClientsData() {
      try {
        await getCookie('authorization');
        const data = await getClients();
        setClients(data);
      } catch (error) {
        router.push('/');
      }
    }
    getClientsData();
  }, [router]);

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
    const {name, birth, CPF, CNH, phone, address, RG, nationality, job, maritalStatus} = clientDetails;
    const maritalStatusArr = maritalStatus.split(' ');
    const realMaritalStatus = maritalStatusArr[0];
    const isMaried = String(realMaritalStatus === 'casado(a)');
    const partnerName = maritalStatusArr[1];
    setEditPopup([name, birth, CPF, CNH, phone, address, RG, nationality, job, isMaried, realMaritalStatus, partnerName]);
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
    <section className="flex flex-col p-5 h-full">
      <PageHeader
        textButton="Adicionar novo cliente"
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
        popupText="Tem certeza que deseja excluir o cliente:"
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
          clientName=""
          clientBirth=""
          clientCPF=""
          clientCNH=""
          clientPhone=""
          clientAddress=""
          clientRg=""
          clientNationality=""
          clientJob=""
          clientIsMarid="false"
          clientMaritalStatus="solteiro(a)"
          clientPartnerName=""
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
          clientAddress={editPopup[5]}
          editMode
          clientRg={editPopup[6]}
          clientNationality={editPopup[7]}
          clientJob={editPopup[8]}
          clientIsMarid={editPopup[9]}
          clientMaritalStatus={editPopup[10]}
          clientPartnerName={editPopup[11]}
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

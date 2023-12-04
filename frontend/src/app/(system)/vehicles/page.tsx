'use client';
import { useEffect, useState } from 'react';
import PageHeader from '../components/pageHeader';
import PageTable from '../components/pageTable';
import { options, tableHeads } from './utils/variables';
import { getCookie } from 'cookies-next';
import { getVehicles } from './utils/vehiclesAxios';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState<string[][]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<string[][]>([]);
  const [popup, setPopup] = useState<string[]>(['', '']);

  useEffect(() => {
    async function getVehiclesData() {
      await getCookie('authorization');
      const data = await getVehicles();
      console.log(data);
      setVehicles(data);
    }
    getVehiclesData()
  }, []);

  useEffect(() => {
    setFilteredVehicles(vehicles);
  }, [vehicles]);

  return (
    <section>
      <PageHeader
        textButton="Adicionar novo veículo"
        handleAdd={() => {}}
        handleInputFilter={() => {}}
        handleSelectFilter={() => {}}
        options={options}
      />
      <PageTable
        tableHeads={tableHeads}
        tableBody={filteredVehicles}
        handleEdit={() => {}}
        handleRemove={() => {}}
        popup={popup}
        popupText=""
        handleConfirmRemove={() => {}}
        handleDeclineRemove={() => {}}
      />
    </section>
  );
}

export default Vehicles;

'use client';
import { useEffect, useState } from 'react';
import PageHeader from '../components/pageHeader';
import PageTable from '../components/pageTable';
import { options, tableHeads } from './utils/variables';
import { getCookie } from 'cookies-next';
import { filterVehicleByStatus, getVehicles } from './utils/vehiclesAxios';

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

  async function handleSelectFilter(event: React.ChangeEvent<HTMLSelectElement>) {
    const category = (event.target.value);
    const data = await filterVehicleByStatus(category);
    setVehicles(data);
  }

  async function handleInputFilter(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.value;
    const filter = vehicles.filter((vehicle) => vehicle[0].includes(name));
    setFilteredVehicles(filter);
  }

  return (
    <section>
      <PageHeader
        textButton="Adicionar novo veículo"
        handleAdd={() => {}}
        handleInputFilter={handleInputFilter}
        handleSelectFilter={handleSelectFilter}
        options={options}
      />
      <PageTable
        tableHeads={tableHeads}
        tableBody={filteredVehicles}
        handleEdit={() => {}}
        handleRemove={() => {}}
        popup={popup}
        popupText="Tem certeza que deseja excluir o veículo de placa:"
        handleConfirmRemove={() => {}}
        handleDeclineRemove={() => {}}
      />
    </section>
  );
}

export default Vehicles;

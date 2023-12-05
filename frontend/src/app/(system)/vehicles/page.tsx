'use client';
import { useEffect, useState } from 'react';
import PageHeader from '../components/pageHeader';
import PageTable from '../components/pageTable';
import { options, tableHeads } from './utils/variables';
import { getCookie } from 'cookies-next';
import { addVehicle, filterVehicleByStatus, getVehicles, removeVehicle } from './utils/vehiclesAxios';
import VehiclesPopup from './components/vehiclesPopup';
import { IVehicle } from '../utils/interfaces';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState<string[][]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<string[][]>([]);
  const [popup, setPopup] = useState<string[]>(['', '']);
  const [addPopup, setAddPopup] = useState<boolean>(false);

  useEffect(() => {
    async function getVehiclesData() {
      await getCookie('authorization');
      const data = await getVehicles();
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

  async function handleConfirmRemove(plate: string) {
    const newVehicles = await removeVehicle(plate);
    setVehicles(newVehicles);
    setPopup(['', '']);
  }

  async function handleAddSubmit(vehicle: IVehicle) {
    const newVehicles = await addVehicle(vehicle);
    setVehicles(newVehicles);
    setAddPopup(false);
  }

  return (
    <section>
      <PageHeader
        textButton="Adicionar novo veículo"
        handleAdd={() => setAddPopup(true)}
        handleInputFilter={handleInputFilter}
        handleSelectFilter={handleSelectFilter}
        options={options}
      />
      <PageTable
        tableHeads={tableHeads}
        tableBody={filteredVehicles}
        handleEdit={() => {}}
        handleRemove={([plate]) => setPopup([plate, plate])}
        popup={popup}
        popupText="Tem certeza que deseja excluir o veículo de placa:"
        handleConfirmRemove={(plate) => handleConfirmRemove(plate)}
        handleDeclineRemove={() => {setPopup(['', ''])}}
        hasDetails
        handleDetails={() => {}}
        hasRentAndReturn
        handleRent={() => {}}
        handleReturn={() => {}}
      />
      {
        addPopup &&
        <VehiclesPopup
          title='Adicionar veículo'
          handleYes={(vehicle) => handleAddSubmit(vehicle)}
          handleNo={() => setAddPopup(false)}
          vehicleCategory="moto"
          vehicleModel=""
          vehicleYear=""
          vehiclePlate=""
          vehicleRenavam=""
          vehicleIpva="false"
          vehicleMileage=""
          vehiclSecuriteValue=""
          vehicleRentValue=""
        />
      }
    </section>
  );
}

export default Vehicles;

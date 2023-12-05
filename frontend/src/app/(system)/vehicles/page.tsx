'use client';
import { useEffect, useState } from 'react';
import PageHeader from '../components/pageHeader';
import PageTable from '../components/pageTable';
import { options, tableHeads } from './utils/variables';
import { getCookie } from 'cookies-next';
import { addVehicle, filterVehicleByStatus, getVehicleDetails, getVehicles, removeVehicle, rentVehicle, returnVehicle, updateVehicle } from './utils/vehiclesAxios';
import VehiclesPopup from './components/vehiclesPopup';
import { IRent, IVehicle } from '../utils/interfaces';
import VehicleDetailsPopup from './components/vehicleDetailsPopup';
import Popup from '../components/popup';
import RentPopup from './components/rentPopup';
import ConfirmRentPopup from './components/confirmRentPopup';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState<string[][]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<string[][]>([]);
  const [popup, setPopup] = useState<string[]>(['', '']);
  const [addPopup, setAddPopup] = useState<boolean>(false);
  const [editPopup, setEditPopup] = useState<IVehicle | null>(null);
  const [detailsPopup, setDetailsPopup] = useState<string>('');
  const [returnPopup, setReturnPopup] = useState<string>('');
  const [rentPopup, setRentPopup] = useState<string>('');
  const [confirmRentPopup, setConfirmRentPopup] = useState<IRent | null>(null);

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

  async function handleEditPopup(plate: string) {
    const vehicle = await getVehicleDetails(plate);
    setEditPopup({
      category: vehicle.category,
      model: vehicle.model,
      year: vehicle.year,
      plate: vehicle.plate,
      RENAVAM: vehicle.RENAVAM,
      IPVA: String(vehicle.IPVA),
      mileage: vehicle.mileage.toFixed(2),
      securityValue: vehicle.securityValue.toFixed(2),
      rentValue: vehicle.rentValue.toFixed(2)
    });
  }

  async function handleEditSubmit(vehicle: IVehicle) {
    const newVehicles = await updateVehicle(vehicle);
    setVehicles(newVehicles);
    setEditPopup(null);
  }

  async function handleReturn(plate: string) {
    const newVehicles = await returnVehicle(plate);
    setVehicles(newVehicles);
    setReturnPopup('');
  }

  async function handleRentSubmit(info: IRent) {
    setConfirmRentPopup(info);
    setRentPopup('');
  }

  async function handleConfirmRentSubmit(info: IRent) {
    const newVehicles = await rentVehicle(info);
    if (newVehicles) {
      setVehicles(newVehicles);
      setConfirmRentPopup(null);
    }
    alert('Precisa devolver o caução para o cliente para alugar novamente!');
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
        handleEdit={(plate) => handleEditPopup(plate)}
        handleRemove={([plate]) => setPopup([plate, plate])}
        popup={popup}
        popupText="Tem certeza que deseja excluir o veículo de placa:"
        handleConfirmRemove={(plate) => handleConfirmRemove(plate)}
        handleDeclineRemove={() => {setPopup(['', ''])}}
        hasDetails
        handleDetails={(plate) => setDetailsPopup(plate)}
        hasRentAndReturn
        handleRent={(plate) => setRentPopup(plate)}
        handleReturn={(plate) => setReturnPopup(plate)}
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
      {
        editPopup &&
        <VehiclesPopup
          title="Alterar veículo"
          handleYes={(vehicle) => handleEditSubmit(vehicle)}
          handleNo={() => setEditPopup(null)}
          vehicleCategory={editPopup.category}
          vehicleModel={editPopup.model}
          vehicleYear={editPopup.year}
          vehiclePlate={editPopup.plate}
          vehicleRenavam={editPopup.RENAVAM}
          vehicleIpva={editPopup.IPVA}
          vehicleMileage={editPopup.mileage}
          vehiclSecuriteValue={editPopup.securityValue}
          vehicleRentValue={editPopup.rentValue}
          editMode
        />
      }
      {
        detailsPopup !== '' &&
        <VehicleDetailsPopup
          plate={detailsPopup}
          handleClose={() => setDetailsPopup('')}
        />
      }
      {
        returnPopup !== '' &&
        <Popup
          title={`Tem certeza que deseja devolver o veículo: ${returnPopup}?`}
          handleYes={() => handleReturn(returnPopup)}
          handleNo={() => setReturnPopup('')}
        />
      }
      {
        rentPopup !== '' &&
        <RentPopup
          plate={rentPopup}
          handleNo={() => setRentPopup('')}
          handleYes={(info) => handleRentSubmit(info)}
        />
      }
      {
        confirmRentPopup &&
        <ConfirmRentPopup
          CPF={confirmRentPopup.CPF}
          name={confirmRentPopup.name}
          plate={confirmRentPopup.plate}
          rentalDate={confirmRentPopup.rentalDate}
          returnDate={confirmRentPopup.returnDate}
          security={confirmRentPopup.security}
          handleYes={(info) => handleConfirmRentSubmit(info)}
          handleNo={() => setConfirmRentPopup(null)}
        />
      }
    </section>
  );
}

export default Vehicles;

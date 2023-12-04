'use client';
import PageHeader from '../components/pageHeader';
import { options } from './utils/variables';

const Vehicles = () => {
  return (
    <section>
      <PageHeader
        textButton="Adicionar novo veículo"
        handleAdd={() => {}}
        handleInputFilter={() => {}}
        handleSelectFilter={() => {}}
        options={options}
      />
    </section>
  );
}

export default Vehicles;

'use client'
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import Billing from './components/billing';
import Securities from './components/securities';
import IPVAsToPay from './components/IPVAsToPay';
import OilChanges from './components/oilChanges';
import RentVehicles from './components/rentVehicles';

const Dashboard = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    async function setData() {
      const newToken = await getCookie('authorization');
      if (typeof newToken === 'string') setToken(newToken);
    }
    setData();
  }, []);

  return (
    <section className="grid gap-2 grid-cols-2 grid-rows-3">
      <Billing token={token} />
      <Securities token={token} />
      <IPVAsToPay token={token} />
      <OilChanges token={token} />
      <RentVehicles token={token} />
    </section>
  );
}

export default Dashboard;

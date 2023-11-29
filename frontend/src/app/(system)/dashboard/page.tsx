'use client'
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import Billing from './components/billing';
import Securities from './components/securities';

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
    <section className="grid gap-2">
      <Billing token={token} />
      <Securities token={token} />
      <div>IPVA</div>
      <div>Oil</div>
      <div>Return</div>
    </section>
  );
}

export default Dashboard;

'use client'
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import Billing from './components/billing';

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
    <section>
      <Billing token={token} />
      <div>Securities</div>
      <div>IPVA</div>
      <div>Oil</div>
      <div>Return</div>
    </section>
  );
}

export default Dashboard;

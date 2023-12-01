'use client'
import Link from 'next/link';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { setAxiosToken } from './utils/axios';

import Popup from './components/popup';

const Navbar = () => {
  const [logout, setLogout] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function setData() {
      const newToken = await getCookie('authorization');
      if (typeof newToken === 'string') setAxiosToken(newToken);
    }
    setData();
  }, []);

  function handleLogout() {
    deleteCookie('authorization');
    router.push('/');
  }

  return (
    <section className='flex gap-2'>
      <button onClick={ () => setLogout(true) }>logout</button>
      <Link href='/users'>users</Link>
      <Link href='/dashboard'>dashboard</Link>
      <Link href='/clients'>clients</Link>
      <Link href='/vehicles'>vehicles</Link>
      {
        logout &&
        <Popup
          title={'Tem certeza que deseja sair?'}
          handleYes={handleLogout}
          handleNo={() => setLogout(false)}
        />
      }
    </section>
  );
}

export default Navbar;

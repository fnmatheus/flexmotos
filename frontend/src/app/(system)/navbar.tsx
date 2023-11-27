'use client'
import Link from 'next/link';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Popup from './popup';

export default function Navbar() {
  const [logout, setLogout] = useState(false);
  const router = useRouter();

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

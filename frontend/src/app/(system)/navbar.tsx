'use client'
import Link from "next/link";
import { deleteCookie } from "cookies-next";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";

export default function Navbar() {
  const [logout, setLogout] = useState(false);
  const router = useRouter();

  useEffect(() => {
    () => deleteCookie('authorization');
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
        <div>
          <div>
            <p>Tem certeza que deseja sair?</p>
            <div className='flex gap-2'>
              <button onClick={handleLogout}>Yes</button>
              <button onClick={ () => setLogout(false) }>No</button>
            </div>
          </div>
        </div>
      }
    </section>
  );
}

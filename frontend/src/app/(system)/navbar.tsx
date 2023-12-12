'use client'
import Link from 'next/link';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { setAxiosToken } from './utils/axios';
import Popup from '../components/popup';
import { Clients, Dashboard, Fnmatheus, Logout, Users, Vehicles } from '../components/svgs';
import { navbarSvg } from '../utils/classnames';

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
    <section className="flex flex-col gap-2 bg-zinc-900 w-[72px] h-screen justify-center py-2 text-white">
      <div className="flex flex-col items-center h-full justify-around my-22">
        <button className="hover:opacity-50" onClick={ () => setLogout(true) }>
          <Logout className={navbarSvg} />
        </button>
        <Link className="hover:opacity-50" href="/users">
          <Users className={navbarSvg} />
        </Link>
        <Link className="hover:opacity-50" href="/dashboard">
          <Dashboard className={navbarSvg} />
        </Link>
        <Link className="hover:opacity-50" href="/clients">
          <Clients className={navbarSvg} />
        </Link>
        <Link className="hover:opacity-50" href="/vehicles">
          <Vehicles className={navbarSvg} />
        </Link>
      </div>
      <div className="flex flex-col items-center text-[10px] gap-2">
        <Fnmatheus className="text-[15px]" />
        <p>© fnmatheus</p>
      </div>
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

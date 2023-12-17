'use client'
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { setCookie } from 'cookies-next';
import { backendURL } from './(system)/utils/urls';
import {Flexmotos, Fnmatheus} from './components/svgs';
import { loginButton, loginInput } from './utils/classnames';

const Home = () => {
  const [incorrectFields, setIncorrectFields] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      code: Number(event.currentTarget.code.value) || 0,
      name: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
    };

    try {
      const { data } = await axios.post(`${backendURL}/users/signin`, payload);
      if (data === 'Wrong Code' || data === 'User not Found' || data === 'Wrong Password') {
        setIncorrectFields(true);
        return;
      }
      if (typeof data === 'number') return alert(`novo código ${data}`);
      setCookie('authorization', data);
      router.push('/dashboard');
    } catch (e) {
      const error = e as AxiosError;
      alert(error);
    }
  }

  return (
    <main className="flex flex-col justify-between py-4 items-center h-screen w-screen bg-zinc-900 text-white">
      <Flexmotos className="text-[350px] h-[100px]" />
      <div className="flex flex-col items-center gap-6 w-screen">
        <h2 className="text-4xl font-bold">Entrar</h2>
        <div className="flex justify-center items-center bg-zinc-950/70 w-1/3 h-96 rounded-xl">
          <form className="flex flex-col items-center gap-6 text-black w-1/2" onSubmit={handleSubmit}>
            <input className={loginInput} id="code" type="text" placeholder="Código" />
            <input className={loginInput} id="username" type="text" placeholder="Usuário" />
            <input className={loginInput} id="password" type="password" placeholder="Senha" />
            <button className={loginButton}>Entrar</button>
            {
              incorrectFields &&
              <span className="text-white">
                ⓘ campos não preenchidos ou incorretos
              </span>
            }
          </form>
        </div>
      </div>
      <div className="flex gap-2 text-white">
        <Fnmatheus className="text-[20px]" />
        <p>© fnmatheus</p>
      </div>
    </main>
  )
}

export default Home;

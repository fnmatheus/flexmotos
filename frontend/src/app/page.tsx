"use client";

import axios, { AxiosError } from "axios";
import React, { useState } from "react";

export default function Home() {
  const [incorrectFields, setIncorrectFields] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      code: Number(event.currentTarget.code.value) || 0,
      name: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
    };

    try {
      const { data } = await axios.post('http://localhost:3000/users/signin', payload);
      if (data === 'Wrong Code' || data === 'User not Found') {
        setIncorrectFields(true);
        return;
      }
    } catch (e) {
      const error = e as AxiosError;
      alert(error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <form className="text-black" onSubmit={handleSubmit}>
          <input id="code" type="text" />
          <input id="username" type="text" />
          <input id="password" type="password" name="" />
          <button className="bg-white">Entrar</button>
          {
            incorrectFields &&
            <span className="text-white">
              ⓘ campos não preenchidos ou incorretos
            </span>
          }
        </form>
      </div>
    </main>
  )
}

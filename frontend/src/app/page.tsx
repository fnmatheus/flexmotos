"use client";

import axios, { AxiosError, AxiosResponse } from "axios";
import React from "react";

export default function Home() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      code: Number(event.currentTarget.code.value) || 0,
      name: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
    };

    try {
      const { data } = await axios.post('http://localhost:3000/users/signin', payload);
      
      console.log(data);
    } catch (e) {
      const error = e as AxiosError;
      console.log(error);
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
        </form>
      </div>
    </main>
  )
}

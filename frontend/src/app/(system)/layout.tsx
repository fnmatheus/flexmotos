import React from 'react';
import Navbar from './navbar';

const systemLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <section>
      <div className="flex">
        <Navbar />
        <div className="bg-zinc-100 w-full text-black">{children}</div>
      </div>
    </section>
  )
}

export default systemLayout;

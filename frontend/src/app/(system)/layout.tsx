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
        <div>{children}</div>
      </div>
    </section>
  )
}

export default systemLayout;

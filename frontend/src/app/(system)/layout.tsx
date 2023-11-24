import React from 'react';
import Navbar from './navbar';

export default function systemLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <div>
        <Navbar />
        <div>{children}</div>
      </div>
    </section>
  )
}

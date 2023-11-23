import Link from 'next/link';

export default function Navbar() {
  return (
    <section>
      <Link href='/users'>users</Link>
      <Link href='/dashboard'>dashboard</Link>
      <Link href='/clients'>clients</Link>
      <Link href='/vehicles'>vehicles</Link>
    </section>
  );
}

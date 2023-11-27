import Billing from './components/billing';

export default function Dashboard() {
  return (
    <section>
      <Billing />
      <div>Securities</div>
      <div>IPVA</div>
      <div>Oil</div>
      <div>Return</div>
    </section>
  );
}

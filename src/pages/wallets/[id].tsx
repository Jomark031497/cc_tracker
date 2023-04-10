import { useRouter } from 'next/router';

export default function Wallet() {
  const router = useRouter();

  return (
    <>
      Wallet!
      <p>{router.query.id}</p>
    </>
  );
}

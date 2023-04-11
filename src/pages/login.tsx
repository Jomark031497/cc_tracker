import { Button } from '@/components/Elements';
import { getServerAuthSession } from '@/server/auth';
import { GetServerSidePropsContext } from 'next';
import { signIn } from 'next-auth/react';
import { FaDiscord, FaGoogle } from 'react-icons/fa';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default function Login() {
  return (
    <>
      <h1 className="text-2xl font-semibold text-center mb-4">Purchase Tracker</h1>
      <h2 className="text-lg mb-4">Login Methods:</h2>
      <div className="flex flex-col gap-4">
        <Button
          className="flex-1 flex gap-1 items-center w-full justify-center"
          onClick={() =>
            signIn('discord', {
              callbackUrl: '/',
            })
          }
        >
          <FaDiscord className="text-2xl" />
          Login with Discord
        </Button>
        <Button
          className="flex-1 flex gap-1 items-center w-full justify-center"
          onClick={() =>
            signIn('discord', {
              callbackUrl: '/',
            })
          }
        >
          <FaGoogle className="text-2xl" />
          Login with Google
        </Button>
      </div>
    </>
  );
}

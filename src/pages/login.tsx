import { Button } from '@/components/Elements';
import { getServerAuthSession } from '@/server/auth';
import { GetServerSidePropsContext } from 'next';
import { signIn } from 'next-auth/react';
import { FaDiscord } from 'react-icons/fa';

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
      <h1 className="mb-4 text-center text-2xl font-semibold">Purchase Tracker</h1>
      <h2 className="mb-4 text-lg">Login Methods:</h2>
      <div className="flex flex-col gap-4">
        <Button
          className="flex w-full flex-1 items-center justify-center gap-1"
          onClick={() =>
            signIn('discord', {
              callbackUrl: '/',
            })
          }
        >
          <FaDiscord className="text-2xl" />
          Login with Discord
        </Button>
        {/* <Button
          className="flex w-full flex-1 items-center justify-center gap-1"
          onClick={() =>
            signIn('discord', {
              callbackUrl: '/',
            })
          }
        >
          <FaGoogle className="text-2xl" />
          Login with Google
        </Button> */}
      </div>
    </>
  );
}

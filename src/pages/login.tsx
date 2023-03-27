import loginImage from '@/assets/login-image.jpg';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { FaDiscord } from 'react-icons/fa';

export default function Login() {
  return (
    <>
      <main className="min-h-screen min-w-screen bg-gray-50 flex justify-center">
        <div className="relative flex-1 hidden md:block">
          <Image
            src={loginImage}
            alt="Login background"
            fill
            priority
            quality={100}
            className="object-cover"
          />
        </div>

        <div className="flex-1 max-w-md min-h-screen bg-gray-100 px-6 py-8 md:py-16">
          <p className="text-3xl font-extrabold text-center mb-8">Shitty Project</p>

          <div className="flex flex-col">
            <div className="mb-4">
              <label className="text-gray-700 text-sm font-bold mb-2 flex flex-col gap-1">
                Email
                <input
                  className="appearance-none border border-gray-300 rounded-xl w-full py-3 px-3 text-gray-700 leading-tight transition ease-in-out focus:border-primary-main focus:outline-none focus:shadow-outline"
                  type="email"
                />
              </label>
            </div>

            <button
              onClick={() => alert('Not yet implemented!')}
              className="bg-primary-main text-white p-2 rounded-xl mb-4 font-semibold hover:bg-primary-dark transition-all"
            >
              Log in with Email
            </button>
          </div>

          <div className="my-10 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 text-center font-semibold">OR</p>
          </div>

          <div>
            <button
              className="flex-1 flex gap-1 items-center border-2 border-gray-500 w-full justify-center p-2 rounded-xl transition-all"
              onClick={() =>
                signIn('discord', {
                  callbackUrl: '/',
                })
              }
            >
              <FaDiscord className="text-2xl" />
              Login with Discord
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

import { Menu, Transition } from '@headlessui/react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { FiLogOut } from 'react-icons/fi';

export const Navbar = () => {
  const { data: sessionData } = useSession();

  return (
    <header className="bg-gray-200 py-2 px-4 h-[70px] flex items-center justify-between">
      <Link href="/" className="text-primary-main font-bold text-2xl hover:text-primary-dark">
        CC
      </Link>

      {sessionData ? (
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="flex items-center justify-center">
            <Image
              src={sessionData?.user.image}
              alt="User Profile Image"
              height={50}
              width={50}
              className="rounded-full hover:opacity-50"
            />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => signOut({ callbackUrl: '/login' })}
                      className={`${
                        active ? 'bg-primary-dark text-white' : 'text-gray-500'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <FiLogOut className="text-lg mr-1" />
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      ) : (
        <p>Loading...</p>
      )}
    </header>
  );
};

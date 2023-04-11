import { Navbar } from '@/components/Layout';
import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Figtree } from 'next/font/google';

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['300', '400', '600', '800'],
  preload: true,
});

export const RootLayout = ({ children }: { children: ReactNode }) => {
  const { data: sessionData } = useSession();

  return (
    <>
      <div className={`min-h-screen mx-auto max-w-md bg-gray-50 ${figtree.className}`}>
        {sessionData && <Navbar />}
        <main className={`px-4 pt-4`}>{children}</main>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

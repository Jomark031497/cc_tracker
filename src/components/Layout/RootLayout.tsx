import { Navbar } from '@/components/Layout';
import { ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Figtree } from 'next/font/google';

const font = Figtree({
  preload: true,
  subsets: ['latin'],
});

export const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className={`mx-auto min-h-screen max-w-md bg-gray-50 ${font.className}`}>
        <Navbar />
        <main className={`px-4 pt-4`}>{children}</main>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

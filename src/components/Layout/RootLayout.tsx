import { Navbar } from '@/components/Layout';
import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export const RootLayout = ({ children }: { children: ReactNode }) => {
  const { data: sessionData } = useSession();

  return (
    <>
      <div className={`mx-auto min-h-screen max-w-md bg-gray-50`}>
        {sessionData && <Navbar />}
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

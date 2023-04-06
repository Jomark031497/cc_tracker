import { Navbar } from '@/components/Layout';
import { ReactNode } from 'react';

export const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen mx-auto max-w-md bg-gray-50">
      <Navbar />
      <main className={`px-4 pt-16`}>{children}</main>
    </div>
  );
};

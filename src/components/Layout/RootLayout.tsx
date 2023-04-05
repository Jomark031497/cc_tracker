import { ReactNode } from 'react';

export const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className={`min-h-screen mx-auto max-w-md bg-gray-50 px-4 pt-16`}>{children}</main>
    </>
  );
};

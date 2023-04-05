import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { RootLayout } from '@/components/Layout';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <RootLayout>
            <Component {...pageProps} />
          </RootLayout>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

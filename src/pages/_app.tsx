import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { RootLayout } from '@/components/Layout';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={pageProps.session}>
          <RootLayout>
            <Component {...pageProps} />
          </RootLayout>
          <ReactQueryDevtools initialIsOpen={false} />
        </SessionProvider>
      </QueryClientProvider>
    </>
  );
}

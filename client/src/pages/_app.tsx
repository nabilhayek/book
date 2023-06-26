import '@/styles/globals.css'
import { Open_Sans } from 'next/font/google'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from '@/lib/apollo-client'

const urbanist = Open_Sans({subsets: ['latin']})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <main className={urbanist.className}>
      <Component {...pageProps} />
      </main>
    </ApolloProvider>
  );
}

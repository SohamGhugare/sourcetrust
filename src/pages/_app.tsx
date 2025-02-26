import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createConfig, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';
import { aeneid } from '@story-protocol/core-sdk';

// Configure wagmi client
const config = createConfig({
  chains: [aeneid],
  transports: {
    [aeneid.id]: http(),
  },
});

// Create a client
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

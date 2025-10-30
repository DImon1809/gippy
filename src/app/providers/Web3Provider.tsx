import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, WagmiProvider } from "wagmi";
import { arbitrum, base, mainnet, optimism, polygon, sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

import { store } from "@/app/store";

type Props = {
  children: ReactNode;
};

const wagmiConfig = createConfig({
  chains: [mainnet, polygon, arbitrum, optimism, base, sepolia],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </WagmiProvider>
    </Provider>
  );
};

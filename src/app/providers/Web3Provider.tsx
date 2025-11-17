import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
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
    [mainnet.id]: http("https://rpc.ankr.com/eth"),
    [polygon.id]: http("https://rpc.ankr.com/polygon"),
    [arbitrum.id]: http("https://rpc.ankr.com/arbitrum"),
    [optimism.id]: http("https://rpc.ankr.com/optimism"),
    [base.id]: http("https://mainnet.base.org"),
    [sepolia.id]: http("https://rpc.sepolia.org"),
  },
});

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          {/* {children} */}
          <RainbowKitProvider
          // modalSize="compact"
          >
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </Provider>
  );
};

import { type ReactNode, useContext } from "react";
import { Provider } from "react-redux";
import { darkTheme, lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, WagmiProvider } from "wagmi";
import { arbitrum, base, mainnet, optimism, polygon, sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

import { ThemeContext } from "@/app/providers/ThemeProvider";
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
  const { theme } = useContext(ThemeContext);

  return (
    <Provider store={store}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            // modalSize="compact"
            theme={theme === "dark" ? darkTheme() : lightTheme()}
          >
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </Provider>
  );
};

import { type ReactNode, useContext } from "react";
import { Provider } from "react-redux";
import { darkTheme, getDefaultConfig, lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, WagmiProvider } from "wagmi";
import { arbitrum, base, mainnet, optimism, polygon, sepolia } from "wagmi/chains";

import { ThemeContext } from "@/app/providers/ThemeProvider";
import { store } from "@/app/store";

type Props = {
  children: ReactNode;
};

const walletConnectProjectId = "b1cbefc5c4d4dcac59b81968e4c7924c";

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: walletConnectProjectId,
  chains: [mainnet, polygon, arbitrum, optimism, base, sepolia],
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
      <WagmiProvider config={config}>
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

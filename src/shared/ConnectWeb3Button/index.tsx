import { useContext } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { LogOut, User, Wallet } from "lucide-react";

import { ThemeContext } from "@/app/providers/ThemeProvider";
import { useWallet2 } from "@/shared/lib/hooks/useWallet2";

import styles from "./style.module.scss";

export const ConnectWeb3Button = () => {
  const { theme } = useContext(ThemeContext);

  const { disconnectWallet, setIsManualLoading } = useWallet2();

  return (
    <ConnectButton.Custom>
      {({ account, chain, mounted, authenticationStatus, openConnectModal }) => {
        const ready = mounted && authenticationStatus !== "loading";

        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated");

        if (!ready) {
          return (
            <div className={`${styles.connect__button} ${theme === "dark" ? styles.dark : ""}`}>
              <div className={styles.spinner}></div>;
            </div>
          );
        }

        if (!connected) {
          return (
            <div
              onClick={() => {
                openConnectModal();
                setIsManualLoading(true);
              }}
              className={`${styles.connect__button} ${theme === "dark" ? styles.dark : ""}`}
            >
              <Wallet size={16} />
              <div className={styles.text__button__wrapper}>
                <span className={styles.text__button}>Connect Wallet</span>
              </div>
            </div>
          );
        }

        // if (chain.unsupported) {
        //   return (
        //     <button onClick={openChainModal} type="button">
        //       Wrong network
        //     </button>
        //   );
        // }

        return (
          <div
            className={`${styles.connect__button} ${styles.connect} ${theme === "dark" ? styles.dark : ""}`}
            onClick={disconnectWallet}
          >
            <User size={16} />
            <div className={styles.text__button__wrapper}>
              <span className={styles.text__button}>
                {account.displayName}
                {account.displayBalance ? ` (${account.displayBalance})` : ""}
              </span>
            </div>
            <LogOut size={16} />
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

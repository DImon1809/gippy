import { useContext } from "react";
import { Wallet } from "lucide-react";
import { LogOut, User } from "lucide-react";

import { ModalContext } from "@/app/providers/ModalProvider";
import { ThemeContext } from "@/app/providers/ThemeProvider";
import { useAppDispatch } from "@/app/store";
import { loguot } from "@/features/user/userSlice";
import { Button } from "@/shared";
import { GippyLogo } from "@/shared/assets/GippyLogo";
import { useWallet2 } from "@/shared/lib/hooks/useWallet2";

import styles from "./style.module.scss";

export const AIHeader = () => {
  const { theme } = useContext(ThemeContext);
  const { openModal } = useContext(ModalContext);

  const dispatch = useAppDispatch();

  const { connectWallet, disconnectWallet, isConnected, isConnecting, address } = useWallet2();

  const currentAddress = address ? [...address.split("").slice(0, 12), "..."].join("") : "";

  const handleConnectButton = () => {
    if (isConnected) {
      disconnectWallet();

      dispatch(loguot());
    } else {
      connectWallet();
    }
  };

  return (
    <header
      className={`${styles.header} ${theme === "dark" ? styles.dark : ""}
    `}
    >
      <div className={styles.logo__content__wrapper}>
        <GippyLogo />
        <div className={styles.content__wrapper}>
          <h2>AI Chat с Gippy</h2>
          <span
            className={`${styles.text} ${theme === "dark" ? styles.dark : ""}
    `}
          >
            Ваш персональный AI ассистент
          </span>
        </div>
      </div>

      <div className={styles.buttons__wrapper}>
        <Button
          isOutline={true}
          handleClick={() => {
            openModal("confirm");
          }}
        >
          Удалить историю
        </Button>
        <div
          className={`${styles.connect__button} ${isConnected && styles.connect} ${theme === "dark" ? styles.dark : ""}`}
          onClick={handleConnectButton}
        >
          {isConnecting ? (
            <div className={styles.spinner}></div>
          ) : isConnected ? (
            <>
              <User size={16} />
              <div className={styles.text__button__wrapper}>
                <span className={styles.text__button}>{currentAddress}</span>
              </div>
              <LogOut size={16} />
            </>
          ) : (
            <>
              <Wallet size={16} />
              <div className={styles.text__button__wrapper}>
                <span className={styles.text__button}>Connect Wallet</span>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

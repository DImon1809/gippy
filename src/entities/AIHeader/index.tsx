import React from "react";
import { Wallet } from "lucide-react";
import { LogOut, User } from "lucide-react";

import { GippyLogo } from "@/shared/assets/GippyLogo";
import { useWallet } from "@/shared/lib/hooks/useWallet";
import { useWallet2 } from "@/shared/lib/hooks/useWallet2";

import styles from "./style.module.scss";

export const AIHeader = () => {
  // const {
  //   isConnected,
  //   isConnecting,
  //   address,
  //   error,
  //   showNameModal,
  //   userName,
  //   connectWallet,
  //   disconnectWallet,
  //   verifyStoredLogin,
  //   submitUserName,
  //   closeNameModal,
  // } = useWallet();

  const { connectWallet, disconnectWallet, isConnect, isConnecting, address } = useWallet2();

  const currentAddress = address ? [...address.split("").slice(0, 12), "..."].join("") : "";

  const handleButton = () => {
    if (isConnect) {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo__content__wrapper}>
        <GippyLogo />
        <div className={styles.content__wrapper}>
          <h2>AI Chat с Gippy</h2>
          <span>Ваш персональный AI ассистент</span>
        </div>
      </div>

      <div
        className={`${styles.connect__button} ${isConnect && styles.connect}`}
        onClick={handleButton}
      >
        {isConnecting ? (
          <div className={styles.spinner}></div>
        ) : isConnect ? (
          <>
            <User size={16} />
            <div className={styles.text__button}>
              <span>{currentAddress}</span>
            </div>
            <LogOut size={16} />
          </>
        ) : (
          <>
            <Wallet size={16} />
            <div className={styles.text__button}>
              <span>Connect Wallet</span>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

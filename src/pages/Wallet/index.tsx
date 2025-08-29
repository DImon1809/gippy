import React from "react";

import { BlockChainCards } from "@/entities/BlockChainCards";

import styles from "./style.module.scss";

export const Wallet = () => {
  return (
    <section className={styles.wallet}>
      <div className={styles.wallet__content}>
        <header className={styles.wallet__header}>
          <div>
            <h3 className={styles.wallet__title}>Wallet</h3>
          </div>
          <div>
            <p>Manage your crypto assets</p>
          </div>
        </header>
        <BlockChainCards />
      </div>
    </section>
  );
};

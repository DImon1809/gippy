import { useContext } from "react";

import { ThemeContext } from "@/app/providers/ThemeProvider";
import { BlockChainCards } from "@/entities/BlockChainCards";

import styles from "./style.module.scss";

const Wallet = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <section className={`${styles.wallet} ${theme === "dark" ? styles.dark : ""}`}>
      <div className={styles.wallet__content}>
        <header className={styles.wallet__header}>
          <div>
            <h3 className={`${styles.wallet__title} ${theme === "dark" ? styles.dark : ""}`}>Wallet</h3>
          </div>
          <div>
            <p className={`${styles.wallet__description} ${theme === "dark" ? styles.dark : ""}`}>
              Manage your crypto assets
            </p>
          </div>
        </header>
        <BlockChainCards />
      </div>
    </section>
  );
};

export default Wallet;

import { useContext } from "react";

import { ThemeContext } from "@/app/providers/ThemeProvider";
import { GippyLogo } from "@/shared/assets/GippyLogo";
import type { Message } from "@/shared/config/Message";

import styles from "./style.module.scss";

type Props = {
  message: Message;
};

export const ProcessingTransaction = ({ message }: Props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.processing__transaction} ${theme === "dark" ? styles.dark : ""}`}>
      <div className={styles.processing__header}>
        <svg width="30" height="30" viewBox="0 0 30 30" className={styles.processing__loading}>
          <circle cx="15" cy="15" r="8" stroke-width="3" className={styles.loading} />
        </svg>

        <h3 className={`${styles.processing__title} ${theme === "dark" ? styles.dark : ""}`}>Processing Transaction</h3>
      </div>

      <div className={styles.transaction__info}>
        <div className={styles.column}>
          <span className={`${styles.column__name} ${theme === "dark" ? styles.dark : ""}`}>To:</span>
          <span className={`${styles.column__name} ${theme === "dark" ? styles.dark : ""}`}>Transaction:</span>
        </div>
        <div className={styles.column}>
          <span className={`${styles.column__value} ${theme === "dark" ? styles.dark : ""}`}>
            {JSON.parse(message.content)?.from || ""}
          </span>
          <span className={`${styles.column__value} ${theme === "dark" ? styles.dark : ""}`}>
            {JSON.parse(message.content)?.to || ""}
          </span>
        </div>
      </div>

      <div className={styles.processing__footer}>
        <div className={`${styles.loading__wrapper} ${theme === "dark" ? styles.dark : ""}`}>
          <div className={`${styles.loading} ${theme === "dark" ? styles.dark : ""}`}></div>
        </div>
        <p className={`${styles.loading__label} ${theme === "dark" ? styles.dark : ""}`}>Confirming on blockchain...</p>
      </div>

      <div className={styles.sender}>
        <GippyLogo size={32} />
      </div>
    </div>
  );
};

import React, { useContext } from "react";
import { Check } from "lucide-react";

import { ThemeContext } from "@/app/providers/ThemeProvider";
import { Button } from "@/shared";
import { GippyLogo } from "@/shared/assets/GippyLogo";
import type { Message } from "@/shared/config/Message";

import styles from "./style.module.scss";

type Props = {
  message: Message;
};

export const TransactionSuccessful = ({ message }: Props) => {
  const { theme } = useContext(ThemeContext);

  const handleClick = () => {
    window.open(
      `https://polygon.blockscout.com/tx/${
        message.transaction?.transactionId || "0x1a2b3c4d5e6f7890abcdef1234567890abcdef12"
      }`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className={`${styles.transaction__successful} ${theme === "dark" ? styles.dark : ""}`}>
      <div className={styles.transaction__header}>
        <Check size={21} className={styles.check} color="#22c55e" />
        <h3 className={`${styles.transaction__title} ${theme === "dark" ? styles.dark : ""}`}>
          Transaction Successful
        </h3>
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

      <div className={styles.success__loading}>
        <div className={styles.loading}>
          <div className={styles.loading__cicle}>
            <Check size={28} color="#fff" />
          </div>
          <span className={`${styles.success__label} ${theme === "dark" ? styles.dark : ""}`}>Payment Confirmed!</span>
        </div>
      </div>

      <div>
        <Button className={styles.button} isLink={true} handleClick={handleClick}>
          View on Explorer
        </Button>
      </div>

      <div className={styles.sender}>
        <GippyLogo size={32} />
      </div>
    </div>
  );
};

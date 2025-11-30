import React, { useContext, useEffect } from "react";
import { ArrowRight, Check, LoaderCircle, Tickets } from "lucide-react";

import { ModalContext } from "@/app/providers/ModalProvider";
import { ThemeContext } from "@/app/providers/ThemeProvider";
import { XButton } from "@/shared";
import type { Message } from "@/shared/config/Message";

import styles from "./stye.module.scss";

type Props = {
  transaction: Message["transaction"];
};

const Pending = () => {
  return (
    <div className={`${styles.status} ${styles.processing}`}>
      <LoaderCircle size={19} color="#3b82f6" className={styles.loader} />
    </div>
  );
};

const TransactionStatic = () => {
  return (
    <div className={`${styles.status} ${styles.static}`}>
      <Tickets color="#444444c7" />
    </div>
  );
};

const CheckLoad = () => {
  return (
    <div className={`${styles.status} ${styles.pending}`}>
      <div className={styles.check__wrapper}>
        <Check size={12} color="#22c55e" />
      </div>
    </div>
  );
};

export const TransactionPendingModal = ({ transaction }: Props) => {
  const { theme } = useContext(ThemeContext);
  const { closeModal } = useContext(ModalContext);

  useEffect(() => {
    if (transaction?.status && transaction?.status !== "approve") {
      closeModal();
    }
  }, [transaction]);

  return (
    <div className={`${styles.transaction_modal} ${theme === "dark" ? styles.dark : ""}`}>
      <div className={styles.statuses__wrapper}>
        <div className={styles.status__wrapper}>
          {transaction?.status === "approve" ? <Pending /> : <CheckLoad />}
          <span
            className={`${styles.status__label} ${theme === "dark" ? styles.dark : ""} ${transaction?.status === "pending" ? styles.success : ""}`}
          >
            Approve
          </span>
        </div>
        <ArrowRight size={21} color="#a9b1bb" />
        <div className={styles.status__wrapper}>
          {transaction?.status === "pending" ? <Pending /> : <TransactionStatic />}
          <span
            className={`${styles.status__label} ${theme === "dark" ? styles.dark : ""} ${transaction?.status === "pending" ? styles.success : ""}`}
          >
            Перевод
          </span>
        </div>
      </div>

      <XButton className={styles.xbutton__wrapper} handler={closeModal} />

      <div className={styles.content__wrapper}>
        <div className={`${styles.amount__wrapper} ${theme === "dark" ? styles.dark : ""}`}>
          <span
            className={`${styles.amount} ${theme === "dark" ? styles.dark : ""}`}
          >{`${transaction?.amount || 1000} ${transaction?.recipient || "USDT"}`}</span>
        </div>

        <div className={styles.big__loader}>
          <LoaderCircle size={25} color="#3b82f6" className={styles.loader} />
        </div>

        <div className={styles.info__wrapper}>
          <h4 className={`${styles.title} ${theme === "dark" ? styles.dark : ""}`}>Подтвердите перевод</h4>
          <p className={styles.paragraph}>Откройте кошелёк и подтвердите основную транзакцию</p>
        </div>

        <div className={styles.dot__loader}>
          <div className={`${styles.dot} ${styles.dot__1}`}></div>
          <div className={`${styles.dot} ${styles.dot__2}`}></div>
          <div className={`${styles.dot} ${styles.dot__3}`}></div>
        </div>
      </div>
    </div>
  );
};

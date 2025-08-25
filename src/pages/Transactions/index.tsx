import React from "react";

import { TransactionsTable } from "@/entities/TransactionsTable";

import styles from "./style.module.scss";

export const Transactions = () => {
  return (
    <section className={styles.transactions}>
      <header className={styles.transactions__header}>
        <div>
          <h3 className={styles.transactions__title}>Transaction History</h3>
        </div>
        <div>
          <p>View and manage your transactions through Gippy</p>
        </div>
      </header>
      <TransactionsTable />
    </section>
  );
};

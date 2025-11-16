import { useContext } from "react";

import { ThemeContext } from "@/app/providers/ThemeProvider";
import { TransactionsTable } from "@/entities/TransactionsTable";

import styles from "./style.module.scss";

const Transactions = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <section className={`${styles.transactions} ${theme === "dark" ? styles.dark : ""}`}>
      <header className={styles.transactions__header}>
        <div>
          <h3 className={`${styles.transactions__title} ${theme === "dark" ? styles.dark : ""}`}>
            Transaction History
          </h3>
        </div>
        <div>
          <p className={`${styles.transactions__description} ${theme === "dark" ? styles.dark : ""}`}>
            View and manage your transactions through Gippy
          </p>
        </div>
      </header>
      <TransactionsTable />
    </section>
  );
};

export default Transactions;

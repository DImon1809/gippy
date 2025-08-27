import React from "react";

import { useAppSelector } from "@/app/store";
import { BalanceCard } from "@/entities/BalanceCard";
import { SupportDefaultCard } from "@/entities/SupportDefaultCard";

import styles from "./style.module.scss";

const statsData = [
  { title: "Total Balance", value: "$124,567.89", change: "+12.5%" },
  { title: "Active Positions", value: "8", change: "+2" },
  { title: "Monthly Profit", value: "$8,432.10", change: "+18.2%" },
  { title: "Rransactions Count", value: "156", change: "+24" },
  { title: "Contacts Count", value: "42", change: "+5" },
  { title: "Support Tickets", value: "3", change: "-1" },
];

export const Support = () => {
  const { address } = useAppSelector(state => state.walletSlice);

  console.log("address", address);

  return (
    <section className={styles.support__dashboard}>
      <header className={styles.support__header}>
        <h3 className={styles.support__title}>Financial AI Dashboard</h3>
        <p className={styles.support__description}>
          Professional crypto asset management interface
        </p>
      </header>

      {!!address && (
        <section className={styles.stats__wrapper}>
          {statsData.map((stat, index) => (
            <BalanceCard key={index} stat={stat} />
          ))}
        </section>
      )}

      <SupportDefaultCard wallet={address} />
    </section>
  );
};

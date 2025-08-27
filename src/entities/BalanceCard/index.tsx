import React from "react";

import styles from "./style.module.scss";

type Props = {
  stat: {
    title: string;
    value: string;
    change: string;
  };
};

export const BalanceCard = ({ stat: { title, value, change } }: Props) => {
  return (
    <div className={styles.balance__card}>
      <div className={styles.content__wrapper}>
        <h3 className={styles.card__title}>{title}</h3>
        <h4 className={styles.balance__value}>{value}</h4>
      </div>
      <div
        className={`${styles.balance__change} ${
          change.split("")[0] === "+" ? styles.plus : styles.minus
        }`}
      >
        <span>{change}</span>
      </div>
    </div>
  );
};

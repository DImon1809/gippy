import { useContext } from "react";

import { ThemeContext } from "@/app/providers/ThemeProvider";

import styles from "./style.module.scss";

type Props = {
  stat: {
    title: string;
    value: string;
    change: string;
  };
};

export const BalanceCard = ({ stat: { title, value, change } }: Props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.balance__card} ${theme === "dark" ? styles.dark : ""}`}>
      <div className={styles.content__wrapper}>
        <h3 className={`${styles.card__title} ${theme === "dark" ? styles.dark : ""}`}>{title}</h3>
        <h4 className={`${styles.balance__value} ${theme === "dark" ? styles.dark : ""}`}>
          {value}
        </h4>
      </div>
      <div
        className={`${styles.balance__change} ${
          change.split("")[0] === "+" ? styles.plus : styles.minus
        } ${theme === "dark" ? styles.dark : ""}`}
      >
        <span>{change}</span>
      </div>
    </div>
  );
};

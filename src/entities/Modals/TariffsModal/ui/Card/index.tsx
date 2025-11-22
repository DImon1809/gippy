import React, { useContext } from "react";
import { Check } from "lucide-react";

import { ThemeContext } from "@/app/providers/ThemeProvider";
import type { TariffsCard } from "@/entities/Modals/TariffsModal";

import styles from "./style.module.scss";

type Props = {
  tariff: TariffsCard;
};

export const Card = ({ tariff }: Props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`${styles.card} ${tariff.status === "active" ? styles.active : ""} ${theme === "dark" ? styles.dark : ""}`}
    >
      <header className={styles.card__header}>
        {tariff.isPopular && (
          <div className={styles.popular}>
            <span>Популярный</span>
          </div>
        )}
        <div>
          <h4>{tariff.title}</h4>
        </div>
      </header>
      <div className={styles.row__wrapper}>
        {tariff.items.map((item, i) => (
          <div key={i} className={styles.row}>
            <div className={styles.check__wrapper}>
              <Check size={13} />
            </div>
            <span>{item}</span>
          </div>
        ))}
      </div>
      <footer className={styles.card__footer}>
        <div className={`${styles.check__button} ${tariff.status === "active" ? styles.active : ""}`}>
          <span>{`${tariff.status === "active" ? "Активно" : "Попробовать"}`}</span>
        </div>
      </footer>
    </div>
  );
};

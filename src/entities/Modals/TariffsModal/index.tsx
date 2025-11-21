import React, { useContext } from "react";

import { ModalContext } from "@/app/providers/ModalProvider";
import { ThemeContext } from "@/app/providers/ThemeProvider";
import { Card } from "@/entities/Modals/TariffsModal/ui/Card";
import { XButton } from "@/shared";

import styles from "./style.module.scss";

export type TariffsCard = {
  status: "sample" | "active";
  isPopular: boolean;
  title: string;
  items: string[];
};

const tariffsCards: TariffsCard[] = [
  {
    status: "sample",
    isPopular: false,
    title: "Free",
    items: [
      "5 транзакций в день",
      "10 запросов помощнику",
      "Создавать до 5 контрактов",
      "Сервис аналитики",
      "Сервис кошелька",
    ],
  },
  {
    status: "sample",
    isPopular: true,
    title: "To Go",
    items: [
      "20 транзакций в день",
      "50 запросов помощнику",
      "Создавать до 25 контрактов",
      "Сервис аналитики",
      "Сервис кошелька",
    ],
  },
  {
    status: "active",
    isPopular: false,
    title: "Pro",
    items: [
      "Транзакции без ограничений",
      "Запросы без ограничений",
      "Контракты без ограничений",
      "Сервис аналитики",
      "Сервис кошелька",
    ],
  },
];

export const TariffsModal = () => {
  const { closeModal } = useContext(ModalContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div className={styles.tariffs__modal}>
      <header className={styles.header}>
        <div>
          <h2 className={`${styles.tariffs__title} ${theme === "dark" ? styles.dark : ""}`}>Tariffs</h2>
        </div>
        <XButton handler={closeModal} />
      </header>
      <div>
        {tariffsCards.map((tariff, i) => (
          <Card tariff={tariff} key={i} />
        ))}
      </div>
    </div>
  );
};

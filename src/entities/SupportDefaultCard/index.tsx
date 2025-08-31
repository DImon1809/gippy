import { useContext } from "react";
import { Wallet } from "lucide-react";

import { ThemeContext } from "@/app/providers/ThemeProvider";

import styles from "./style.module.scss";

type Props = {
  wallet: string | null;
};

export const SupportDefaultCard = ({ wallet }: Props) => {
  const { theme } = useContext(ThemeContext);

  if (!wallet)
    return (
      <div className={`${styles.support__default__card} ${theme === "dark" ? styles.dark : ""}`}>
        <div className={styles.wallet__wrapper}>
          <Wallet size={46} />
        </div>
        <h3 className={`${styles.support__title} ${theme === "dark" ? styles.dark : ""}`}>
          Подключите кошелек
        </h3>
        <p className={`${styles.card__description} ${theme === "dark" ? styles.dark : ""}`}>
          Для доступа к функциям платформы необходимо подключить кошелек и подписать сообщение
        </p>
      </div>
    );

  return (
    <div className={`${styles.support__info__card} ${theme === "dark" ? styles.dark : ""}`}>
      <h3 className={`${styles.support__info__title} ${theme === "dark" ? styles.dark : ""}`}>
        Welcome to FinanceAI
      </h3>
      <p className={`${styles.card__description__connect} ${theme === "dark" ? styles.dark : ""}`}>
        Your intelligent crypto asset management companion. Navigate through the sidebar to explore
        different features like wallet management, transaction history, contacts, and more.
      </p>
      <span
        className={`${styles.notification} ${theme === "dark" ? styles.dark : ""}`}
      >{`Подключен: ${wallet}`}</span>
    </div>
  );
};

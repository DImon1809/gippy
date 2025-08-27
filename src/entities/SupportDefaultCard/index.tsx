import { Wallet } from "lucide-react";

import styles from "./style.module.scss";

type Props = {
  wallet: string | null;
};

export const SupportDefaultCard = ({ wallet }: Props) => {
  if (!wallet)
    return (
      <div className={styles.support__default__card}>
        <div className={styles.wallet__wrapper}>
          <Wallet size={46} />
        </div>
        <h3 className={styles.support__title}>Подключите кошелек</h3>
        <p className={styles.card__description}>
          Для доступа к функциям платформы необходимо подключить кошелек и подписать сообщение
        </p>
      </div>
    );

  return (
    <div className={styles.support__info__card}>
      <h3>Welcome to FinanceAI</h3>
      <p className={styles.card__description__connect}>
        Your intelligent crypto asset management companion. Navigate through the sidebar to explore
        different features like wallet management, transaction history, contacts, and more.
      </p>
      <span className={styles.notification}>{`Подключен: ${wallet}`}</span>
    </div>
  );
};

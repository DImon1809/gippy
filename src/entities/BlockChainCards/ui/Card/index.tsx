import { useContext } from "react";
import { Copy, ExternalLink } from "lucide-react";

import { ThemeContext } from "@/app/providers/ThemeProvider";
import type { Blockchain } from "@/entities/BlockChainCards/lib/types";

import styles from "./style.module.scss";

type Props = {
  blockChain: Blockchain;
};

export const Card = ({ blockChain }: Props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.card} ${theme === "dark" ? styles.dark : ""}`}>
      <header className={`${styles.card__header} ${theme === "dark" ? styles.dark : ""}`}>
        <div className={styles.icon}>
          <span>{blockChain.icon}</span>
        </div>
        <div>
          <h3 className={`${styles.card__title} ${theme === "dark" ? styles.dark : ""}`}>
            {blockChain.name}
          </h3>
          <p className={`${styles.card__tokens} ${theme === "dark" ? styles.dark : ""}`}>{`${
            blockChain.coins.length
          } ${blockChain.coins.length === 1 ? "token" : "tokens"}`}</p>
        </div>
      </header>
      <div className={styles.rows__wrapper}>
        {blockChain.coins.map((coin, index) => (
          <div key={index} className={`${styles.row} ${theme === "dark" ? styles.dark : ""}`}>
            <div className={styles.preview}>
              <div className={styles.coin__avatar}>{coin.name.split("").slice(0, 2).join("")}</div>
              <div className={styles.coin__content__wrapper}>
                <h4 className={`${styles.coin__name} ${theme === "dark" ? styles.dark : ""}`}>
                  {coin.name}
                </h4>
                <div
                  className={`${styles.coin__text__wrapper} ${theme === "dark" ? styles.dark : ""}`}
                >
                  <p>{`${coin.address.split("").slice(0, 5).join("")}...${coin.address
                    .split("")
                    .slice(coin.address.length - 6, coin.address.length)
                    .join("")}`}</p>
                  <div className={styles.buttons__wrapper}>
                    <div className={`${styles.button} ${theme === "dark" ? styles.dark : ""}`}>
                      <Copy size={12} />
                    </div>
                    <div className={`${styles.button} ${theme === "dark" ? styles.dark : ""}`}>
                      <ExternalLink size={12} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.coin__number__wrapper}>
              <div>
                <h4 className={`${styles.coin__balance} ${theme === "dark" ? styles.dark : ""}`}>
                  {coin.balance}
                </h4>
              </div>
              <div>
                <p className={`${styles.usd__value} ${theme === "dark" ? styles.dark : ""}`}>
                  {coin.usdValue}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import { Copy, ExternalLink } from "lucide-react";

import type { Blockchain } from "@/entities/BlockChainCards/lib/types";

import styles from "./style.module.scss";

type Props = {
  blockChain: Blockchain;
};

export const Card = ({ blockChain }: Props) => {
  return (
    <div className={styles.card}>
      <header className={styles.card__header}>
        <div className={styles.icon}>
          <span>{blockChain.icon}</span>
        </div>
        <div>
          <h3>{blockChain.name}</h3>
          <p>{`${blockChain.coins.length} ${
            blockChain.coins.length === 1 ? "token" : "tokens"
          }`}</p>
        </div>
      </header>
      <div className={styles.rows__wrapper}>
        {blockChain.coins.map((coin, index) => (
          <div key={index} className={styles.row}>
            <div className={styles.preview}>
              <div className={styles.coin__avatar}>{coin.name.split("").slice(0, 2).join("")}</div>
              <div className={styles.coin__content__wrapper}>
                <h4 className={styles.coin__name}>{coin.name}</h4>
                <div className={styles.coin__text__wrapper}>
                  <p>{`${coin.address.split("").slice(0, 5).join("")}...${coin.address
                    .split("")
                    .slice(coin.address.length - 6, coin.address.length)
                    .join("")}`}</p>
                  <div className={styles.buttons__wrapper}>
                    <div className={styles.button}>
                      <Copy size={12} />
                    </div>
                    <div className={styles.button}>
                      <ExternalLink size={12} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.coin__number__wrapper}>
              <div>
                <h4 className={styles.coin__balance}>{coin.balance}</h4>
              </div>
              <div>
                <p className={styles.usd__value}>{coin.usdValue}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

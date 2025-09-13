import { useContext } from "react";
import { Clock } from "lucide-react";

import { ThemeContext } from "@/app/providers/ThemeProvider";
import { GippyLogo } from "@/shared/assets/GippyLogo";
import type { Message } from "@/shared/config/Message";

import styles from "./style.module.scss";

type Props = {
  message: Message;
};

export const PendingBlock = ({ message }: Props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={styles.pending__block}>
      <div className={`${styles.pending} ${theme === "dark" ? styles.dark : ""}`}>
        <div className={styles.pending__header}>
          <Clock size={16} className={`${styles.clock} ${theme === "dark" ? styles.dark : ""}`} />
          <div>
            <h4 className={`${styles.pending__title} ${theme === "dark" ? styles.dark : ""}`}>Transaction Pending</h4>
          </div>
        </div>

        <div className={styles.transaction__info}>
          <div className={styles.column}>
            <span className={`${styles.column__name} ${theme === "dark" ? styles.dark : ""}`}>To:</span>
            <span className={`${styles.column__name} ${theme === "dark" ? styles.dark : ""}`}>Transaction:</span>
          </div>
          <div className={styles.column}>
            <span className={`${styles.column__value} ${theme === "dark" ? styles.dark : ""}`}>
              {JSON.parse(message.content)?.from || ""}
            </span>
            <span className={`${styles.column__value} ${theme === "dark" ? styles.dark : ""}`}>
              {JSON.parse(message.content)?.to || ""}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.sender}>
        <GippyLogo size={32} />
      </div>
    </div>
  );
};

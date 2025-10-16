import { useContext } from "react";

import { ThemeContext } from "@/app/providers/ThemeProvider";

import styles from "./style.module.scss";

type Props = {
  isDecrease: boolean;
};

export const UserCard = ({ isDecrease }: Props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.user__card} ${theme === "dark" ? styles.dark : ""} ${isDecrease ? styles.decrease : ""}`}>
      <div className={styles.user}>U</div>
      <div className={`${styles.name__description} ${isDecrease ? styles.decrease : ""}`}>
        <span>User</span>
        <span className={`${styles.description} ${theme === "dark" ? styles.dark : ""}`}>offline</span>
      </div>
    </div>
  );
};

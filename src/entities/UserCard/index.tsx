import React, { useContext } from "react";

import { ThemeContext } from "@/app/providers/ThemeProvider";

import styles from "./style.module.scss";

export const UserCard = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`${styles.user__card} ${theme === "dark" ? styles.dark : ""}`}
    >
      <div className={styles.user}>U</div>
      <div className={styles.name__description}>
        <span>User</span>
        <span
          className={`${styles.description} ${
            theme === "dark" ? styles.dark : ""
          }`}
        >
          offline
        </span>
      </div>
    </div>
  );
};

import { useContext } from "react";

import { ThemeContext } from "@/app/providers/ThemeProvider";
import { GippyLogo } from "@/shared/assets/GippyLogo";

import styles from "./style.module.scss";

export const GippyThink = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={styles.gippy__think}>
      <div className={styles.sender}>
        <GippyLogo size={32} />
      </div>
      <h5 className={`${styles.title} ${theme === "dark" ? styles.dark : ""}`}>
        Gippy is thinking
      </h5>
      <div className={styles.thinking}>
        <span
          className={`${styles.l__1} ${styles.dot} ${theme === "dark" ? styles.dark : ""}`}
        ></span>
        <span
          className={`${styles.l__2} ${styles.dot} ${theme === "dark" ? styles.dark : ""}`}
        ></span>
        <span
          className={`${styles.l__3} ${styles.dot} ${theme === "dark" ? styles.dark : ""}`}
        ></span>
        <span
          className={`${styles.l__4} ${styles.dot} ${theme === "dark" ? styles.dark : ""}`}
        ></span>
      </div>
    </div>
  );
};

import { useContext } from "react";

import { ThemeContext } from "@/app/providers/ThemeProvider";

import styles from "./styles.module.scss";

export const PageLoader = () => {
  const { theme } = useContext(ThemeContext);

  return <div className={`${styles.page__loader} ${theme === "dark" ? styles.dark : ""}`}></div>;
};

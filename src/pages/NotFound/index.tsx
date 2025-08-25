import React from "react";
import { useContext } from "react";

import { ThemeContext } from "@/app/providers/ThemeProvider";

import styles from "./style.module.scss";

export const NotFound = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <section className={`${styles.not__found} ${theme === "dark" ? styles.dark : ""}`}>
      <h3>Страница не найдена</h3>
    </section>
  );
};

import React, { type ComponentType, useContext } from "react";

import { ModalContext } from "@/app/providers/ModalProvider";
import { ThemeContext } from "@/app/providers/ThemeProvider";

import styles from "./style.module.scss";

type Props = {
  Icon: ComponentType<{ className?: string | undefined }>;
  name: string;
  description: string;
};

export const SidebarItem = ({ Icon, name, description }: Props) => {
  const { theme } = useContext(ThemeContext);

  console.log("theme", theme);

  const { openModal } = React.useContext(ModalContext);

  const handleClick = () => {
    if (name === "Settings") openModal("settings");
  };

  return (
    <div
      className={`${styles.sidebar__item} ${theme === "dark" ? styles.dark : ""}`}
      onClick={handleClick}
    >
      <div className={styles.icon__wrapper}>
        <Icon className={`${styles.icon} ${theme === "dark" ? styles.dark : ""}`} />
      </div>

      <div className={styles.name__description}>
        <span>{name}</span>
        <span className={`${styles.description} ${theme === "dark" ? styles.dark : ""}`}>
          {description}
        </span>
      </div>
    </div>
  );
};

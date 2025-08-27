import type { ComponentType } from "react";
import React, { useContext } from "react";

import { ModalContext } from "@/app/providers/ModalProvider";
import { ThemeContext } from "@/app/providers/ThemeProvider";

import styles from "./style.module.scss";

type Props = {
  Icon: ComponentType<{ className?: string | undefined }>;
  name: string;
  description: string;
  isActive: boolean;
  navigateForPage: (name: string) => void;
};

export const SidebarItem = ({ Icon, name, description, isActive, navigateForPage }: Props) => {
  const { theme } = useContext(ThemeContext);

  const { openModal } = React.useContext(ModalContext);

  const handleClick = () => {
    console.log(name);
    if (name === "Positions") return;

    if (name === "Settings") return openModal("settings");

    navigateForPage(name);
  };

  return (
    <div
      className={`${styles.sidebar__item} ${theme === "dark" ? styles.dark : ""} ${
        isActive ? styles.active : ""
      } ${name === "Positions" ? styles.disable : ""}`}
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

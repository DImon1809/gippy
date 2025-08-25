import type { ComponentType, Dispatch, SetStateAction } from "react";
import React, { useContext } from "react";

import { ModalContext } from "@/app/providers/ModalProvider";
import { ThemeContext } from "@/app/providers/ThemeProvider";

import styles from "./style.module.scss";

type Props = {
  Icon: ComponentType<{ className?: string | undefined }>;
  name: string;
  description: string;
  isActive: boolean;
  setActiveButton: Dispatch<SetStateAction<string>>;
  navigateForPage: (name: string) => void;
};

export const SidebarItem = ({
  Icon,
  name,
  description,
  isActive,
  setActiveButton,
  navigateForPage,
}: Props) => {
  const { theme } = useContext(ThemeContext);

  const { openModal } = React.useContext(ModalContext);

  const handleClick = () => {
    console.log(name);
    if (name === "Positions") return;

    if (name === "Settings") return openModal("settings");

    setActiveButton(name);
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

import type { ComponentType } from "react";
import { useContext } from "react";

import { ModalContext } from "@/app/providers/ModalProvider";
import { ThemeContext } from "@/app/providers/ThemeProvider";

import styles from "./style.module.scss";

type Props = {
  Icon: ComponentType<{ className?: string | undefined }>;
  name: string;
  description: string;
  isActive: boolean;
  isDecrease: boolean;
  navigateForPage: (name: string) => void;
};

export const SidebarItem = ({ Icon, name, description, isActive, isDecrease, navigateForPage }: Props) => {
  const { theme } = useContext(ThemeContext);

  const { openModal } = useContext(ModalContext);

  const handleClick = () => {
    if (name === "Positions") return;

    if (name === "Settings") return openModal("settings", null);

    navigateForPage(name);
  };

  return (
    <div
      className={`${styles.sidebar__item} ${theme === "dark" ? styles.dark : ""} ${isActive ? styles.active : ""} ${
        name === "Positions" ? styles.disable : ""
      } ${isDecrease ? styles.decrease : ""}`}
      onClick={handleClick}
    >
      <div className={styles.icon__wrapper}>
        <Icon className={`${styles.icon} ${isActive ? styles.active : ""}`} />
      </div>

      <div className={`${styles.name__description} ${isDecrease ? styles.decrease : ""}`}>
        <span>{name}</span>
        <span className={`${styles.description} ${theme === "dark" ? styles.dark : ""}`}>{description}</span>
      </div>
    </div>
  );
};

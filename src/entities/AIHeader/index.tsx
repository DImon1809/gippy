import { useContext } from "react";

import { ModalContext } from "@/app/providers/ModalProvider";
import { ThemeContext } from "@/app/providers/ThemeProvider";
import { Button, ConnectWeb3Button } from "@/shared";
import { GippyLogo } from "@/shared/assets/GippyLogo";

import styles from "./style.module.scss";

export const AIHeader = () => {
  const { theme } = useContext(ThemeContext);
  const { openModal } = useContext(ModalContext);

  return (
    <header
      className={`${styles.header} ${theme === "dark" ? styles.dark : ""}
    `}
    >
      <div className={styles.logo__content__wrapper}>
        <GippyLogo />
        <div className={styles.content__wrapper}>
          <h2>AI Chat с Gippy</h2>
          <span
            className={`${styles.text} ${theme === "dark" ? styles.dark : ""}
    `}
          >
            Ваш персональный AI ассистент
          </span>
        </div>
      </div>

      <div className={styles.buttons__wrapper}>
        <Button
          isOutline={true}
          handleClick={() => {
            openModal("confirm");
          }}
        >
          Удалить историю
        </Button>
        <ConnectWeb3Button />
      </div>
    </header>
  );
};

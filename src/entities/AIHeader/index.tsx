import { useContext } from "react";
import { Crown } from "lucide-react";

import { ModalContext } from "@/app/providers/ModalProvider";
import { ThemeContext } from "@/app/providers/ThemeProvider";
import { useAppSelector } from "@/app/store";
import { Button, ConnectWeb3Button } from "@/shared";
import { GippyLogo } from "@/shared/assets/GippyLogo";

import styles from "./style.module.scss";

export const AIHeader = () => {
  const { theme } = useContext(ThemeContext);
  const { openModal } = useContext(ModalContext);

  const { isHaveMessages } = useAppSelector(state => state.messageSlice);
  const { isAuthorized } = useAppSelector(state => state.userSlice);

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
        {isAuthorized && (
          <div
            className={`${styles.upgrade__button} ${theme === "dark" ? styles.dark : ""}`}
            onClick={() => {
              openModal("tariffs");
            }}
          >
            <Crown size={16} />
            <div className={styles.text__button__wrapper}>
              <span className={styles.text__button}>Upgrade</span>
            </div>
          </div>
        )}

        {isHaveMessages && (
          <Button
            isOutline={true}
            handleClick={() => {
              openModal("confirm");
            }}
          >
            Удалить историю
          </Button>
        )}
        <ConnectWeb3Button />
      </div>
    </header>
  );
};

import { useContext } from "react";
import { toast } from "react-toastify";

import { ModalContext } from "@/app/providers/ModalProvider";
import { ThemeContext } from "@/app/providers/ThemeProvider";
import { useAppSelector } from "@/app/store";
import { useClearHistoryMessageMutation } from "@/features/message/messageApi";
import { Button, XButton } from "@/shared";
import { useWallet2 } from "@/shared/lib/hooks/useWallet2";

import styles from "./style.module.scss";

export const ConfirmModal = () => {
  const { theme } = useContext(ThemeContext);
  const { closeModal } = useContext(ModalContext);

  const { isAuthorized } = useAppSelector(state => state.userSlice);

  const { address } = useWallet2();

  const [clearHistoryMessage, { isLoading }] = useClearHistoryMessageMutation();

  const handleConfirmClick = async () => {
    try {
      if (address && isAuthorized) {
        await clearHistoryMessage({ session_id: address }).unwrap();

        closeModal();
      }
    } catch (err) {
      const errors: [string, { detail: string }][] = Object.entries(err as object);
      const message =
        errors.at(-1)?.[1]?.detail === `Сессия ${address} не найдена или не может быть очищена`
          ? "Не найдена история сообщений"
          : "Произошла ошибка при очистке истории сообщений";

      toast.error(message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme === "dark" ? "dark" : "light",
      });
    }
  };

  return (
    <div className={`${styles.confirm__modal} ${theme === "dark" ? styles.dark : ""}`}>
      <header className={styles.header}>
        <div>
          <h2 className={`${styles.confirm__title} ${theme === "dark" ? styles.dark : ""}`}>Confirm action</h2>
        </div>
        <XButton handler={closeModal} />
      </header>
      <form className={styles.form}>
        <p className={`${styles.form__text} ${theme === "dark" ? styles.dark : ""}`}>
          Вы точно хотите удалить историю сообщений?
        </p>

        <Button className={styles.confirm__button} isLoading={isLoading} handleClick={handleConfirmClick}>
          Подтвердить
        </Button>
      </form>
    </div>
  );
};

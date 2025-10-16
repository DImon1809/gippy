import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Info } from "lucide-react";

import { ModalContext } from "@/app/providers/ModalProvider";
import { ThemeContext } from "@/app/providers/ThemeProvider";
import { useAppSelector } from "@/app/store";
import { useRegisterMutation } from "@/features/user/userApi";
import { XButton } from "@/shared";
import { Button, Input } from "@/shared";

import styles from "./style.module.scss";

export const RegistrationModal = () => {
  const { theme } = useContext(ThemeContext);
  const { closeModal } = useContext(ModalContext);

  const { address } = useAppSelector(state => state.walletSlice);

  const [register] = useRegisterMutation();

  const [userName, setUserName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const handleRegister = async () => {
    try {
      if (!address) {
        return toast.warning("Пожалуйста, подключите крипто-кошелёк", {
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

      if (!userName || !email) {
        return toast.warning("Пожалуйста, заполните все поля", {
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

      await register({
        address: "24",
        email,
        userName,
      }).unwrap();

      toast.success(`Вы успешно зарегистрировались`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme === "dark" ? "dark" : "light",
      });

      closeModal();
    } catch {
      toast.error("Произошла ошибка при регистрации", {
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
    <section className={`${styles.registration__modal} ${theme === "dark" ? styles.dark : ""}`}>
      <header className={styles.header}>
        <div>
          <h2 className={`${styles.registration__title} ${theme === "dark" ? styles.dark : ""}`}>Registration</h2>
        </div>
        <XButton handler={closeModal} />
      </header>
      <form className={styles.registration__form}>
        <div className={styles.description__wrapper}>
          <Info color="#3f79f7" size={41} />
          <p className={`${styles.description} ${theme === "dark" ? styles.dark : ""}`}>
            Пройдите, пожалуйста, регистрацию, чтобы отправлять сообщения
          </p>
        </div>
        <div>
          <label htmlFor="userName" className={`${styles.form__label} ${theme === "dark" ? styles.dark : ""}`}>
            Name
          </label>
          <Input
            id="userName"
            placeholder="Enter your user name"
            className={styles.input}
            value={userName}
            setValue={setUserName}
          />
        </div>

        <div>
          <label htmlFor="email" className={`${styles.form__label} ${theme === "dark" ? styles.dark : ""}`}>
            Email
          </label>
          <Input id="email" placeholder="Enter your email" className={styles.input} value={email} setValue={setEmail} />
        </div>

        <div className={styles.buttons__wrapper}>
          <Button className={styles.button} handleClick={handleRegister}>
            Register
          </Button>
        </div>
      </form>
    </section>
  );
};

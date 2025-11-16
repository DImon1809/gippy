import { useContext } from "react";

import { ThemeContext } from "@/app/providers/ThemeProvider";
import { useAppSelector } from "@/app/store";

import styles from "./style.module.scss";

type Props = {
  isDecrease: boolean;
};

export const UserCard = ({ isDecrease }: Props) => {
  const { theme } = useContext(ThemeContext);

  const { userName } = useAppSelector(state => state.userSlice);

  return (
    <div className={`${styles.user__card} ${theme === "dark" ? styles.dark : ""} ${isDecrease ? styles.decrease : ""}`}>
      <div className={styles.user}>U</div>
      <div className={`${styles.name__description} ${isDecrease ? styles.decrease : ""}`}>
        <span>{userName ? (userName.length > 8 ? `${userName.slice(0, 8)}...` : userName) : "User"}</span>
        <span className={`${styles.description} ${theme === "dark" ? styles.dark : ""}`}>offline</span>
      </div>
    </div>
  );
};

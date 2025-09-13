import { useContext } from "react";

import { ThemeContext } from "@/app/providers/ThemeProvider";
import { GippyLogo } from "@/shared/assets/GippyLogo";
import { UserLogo } from "@/shared/assets/UserLogo";
import type { Message } from "@/shared/config/Message";

import styles from "./style.module.scss";

type Props = {
  message: Message;
};

export const SimpleMessage = ({ message }: Props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles.message} ${message.type === "ai" ? `${styles.ai} ${theme === "dark" ? styles.dark : ""}` : styles.user}`}>
      {message.content.split("\n").map((content, index) => {
        return (
          <p className={`${index > 0 ? styles.row : ""}`} key={index}>
            {content}
          </p>
        );
      })}
      <div className={`${styles.sender} ${message.type === "ai" ? styles.ai : styles.user}`}>
        {message.type === "ai" ? <GippyLogo size={32} /> : <UserLogo />}
      </div>

      <div className={`${styles.time} ${message.type === "ai" ? styles.ai : styles.user}`}>
        <span>{new Date(message.timestamp).toTimeString().slice(0, 5)}</span>
      </div>
    </div>
  );
};

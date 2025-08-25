import type { Dispatch, SetStateAction } from "react";
import { useContext, useEffect } from "react";

import { ThemeContext } from "@/app/providers/ThemeProvider";
import styles from "@/entities/AIMessenger/style.module.scss";
import { GippyLogo } from "@/shared/assets/GippyLogo";

type Props = {
  text: string;
  speed: number;
  displayedText: string;
  handleDone: (text: string) => void;
  setDisplayedText: Dispatch<SetStateAction<string>>;
};

export const TypingMessage = ({
  text,
  speed = 50,
  displayedText,
  handleDone,
  setDisplayedText,
}: Props) => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(prev => prev + text[index]);

      index++;
      if (index >= text.length - 1) {
        clearInterval(interval);

        handleDone(text);
        setDisplayedText("");
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <div className={`${styles.message} ${styles.ai} ${theme === "dark" ? styles.dark : ""}`}>
      <p>{displayedText}</p>
      <div className={`${styles.sender} ${styles.ai}`}>
        <GippyLogo size={32} />
      </div>
    </div>
  );
};

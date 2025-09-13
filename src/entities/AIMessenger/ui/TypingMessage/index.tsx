import type { Dispatch, SetStateAction } from "react";
import { useContext, useEffect } from "react";

import { ThemeContext } from "@/app/providers/ThemeProvider";
import { GippyLogo } from "@/shared/assets/GippyLogo";

import styles from "./style.module.scss";

type Props = {
  text: string;
  speed: number;
  displayedText: string;
  handleDone: (text: string) => void;
  setDisplayedText: Dispatch<SetStateAction<string>>;
};

export const TypingMessage = ({ text, speed = 50, displayedText, handleDone, setDisplayedText }: Props) => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(prev => {
        const temp = index === 1 ? text[0] + text[index] : prev + text[index];

        return temp;
      });

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
      {displayedText.split("\n").map((content, index) => {
        return (
          <p className={`${index > 0 ? styles.row : ""}`} key={index}>
            {content}
          </p>
        );
      })}
      <div className={`${styles.sender} ${styles.ai}`}>
        <GippyLogo size={32} />
      </div>
    </div>
  );
};

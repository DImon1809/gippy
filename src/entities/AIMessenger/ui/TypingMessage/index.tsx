import type { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";

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
    <div className={`${styles.message} ${styles.ai}`}>
      <span>{displayedText}</span>
      <div className={`${styles.sender} ${styles.ai}`}>
        <GippyLogo size={32} />
      </div>
    </div>
  );
};

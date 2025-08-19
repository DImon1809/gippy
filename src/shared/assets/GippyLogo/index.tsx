import { useContext } from "react";

import { ThemeContext } from "@/app/providers/ThemeProvider";

import styles from "./style.module.scss";

type Props = {
  size?: number;
};

export const GippyLogo = ({ size = 41 }: Props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        width: `${size + 5}px`,
        height: `${size + 5}px`,
      }}
      className={`${styles.gippy__logo} ${theme === "dark" ? styles.dark : ""}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Антенна */}
        <circle
          cx="50"
          cy="8"
          r="3"
          fill="none"
          stroke={theme === "dark" ? "#fff" : "#1e293b"}
          strokeWidth="2.5"
        />
        <line
          x1="50"
          y1="11"
          x2="50"
          y2="20"
          stroke={theme === "dark" ? "#fff" : "#1e293b"}
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Голова робота - большая квадратная */}
        <rect
          x="18"
          y="20"
          width="64"
          height="44"
          rx="8"
          fill="none"
          stroke={theme === "dark" ? "#fff" : "#1e293b"}
          strokeWidth="3.5"
        />

        {/* Очки-дисплеи */}
        <circle
          cx="38"
          cy="38"
          r="10"
          fill="none"
          stroke={theme === "dark" ? "#fff" : "#1e293b"}
          strokeWidth="3"
        />
        <circle
          cx="62"
          cy="38"
          r="10"
          fill="none"
          stroke={theme === "dark" ? "#fff" : "#1e293b"}
          strokeWidth="3"
        />

        {/* Перемычка очков */}
        <line
          x1="48"
          y1="38"
          x2="52"
          y2="38"
          stroke={theme === "dark" ? "#fff" : "#1e293b"}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Зрачки */}
        <circle cx="38" cy="38" r="4" fill={theme === "dark" ? "#fff" : "#1e293b"} />
        <circle cx="62" cy="38" r="4" fill={theme === "dark" ? "#fff" : "#1e293b"} />

        {/* Улыбка */}
        <path
          d="M 35 52 Q 50 58 65 52"
          stroke={theme === "dark" ? "#fff" : "#1e293b"}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

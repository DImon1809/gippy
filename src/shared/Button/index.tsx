import { type ReactNode, useContext } from "react";
import { Edit, ExternalLink, Plus } from "lucide-react";

import { ThemeContext } from "@/app/providers/ThemeProvider";

import styles from "./style.module.scss";

type Props = {
  children: ReactNode;
  className?: string;
  isAdd?: boolean;
  isEdit?: boolean;
  isLink?: boolean;
  isOutline?: boolean;
  handleClick?: () => void;
};

export const Button = ({
  children,
  className,
  isAdd = false,
  isEdit = false,
  isLink = false,
  isOutline = false,
  handleClick,
}: Props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      onClick={event => {
        event.preventDefault();

        if (handleClick) handleClick();
      }}
      className={`${styles.button} ${isOutline ? styles.outline : ""} ${
        theme === "dark" ? styles.dark : ""
      } ${className}`}
    >
      {isAdd && <Plus size={16} className={styles.icon} />}
      {isEdit && <Edit size={16} className={styles.icon} />}
      {isLink && <ExternalLink size={16} className={styles.icon} />}

      <span
        className={`${styles.button__text}  ${isOutline ? styles.outline : ""} ${
          theme === "dark" ? styles.dark : ""
        }`}
      >
        {children}
      </span>
    </div>
  );
};

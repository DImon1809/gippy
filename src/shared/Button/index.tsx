import type { ReactNode } from "react";
import { Edit, Plus } from "lucide-react";

import styles from "./style.module.scss";

type Props = {
  children: ReactNode;
  className?: string;
  isAdd?: boolean;
  isEdit?: boolean;
  isOutline?: boolean;
  handleClick?: () => void;
};

export const Button = ({
  children,
  className,
  isAdd = false,
  isEdit = false,
  isOutline = false,
  handleClick,
}: Props) => {
  return (
    <div
      onClick={event => {
        event.preventDefault();

        if (handleClick) handleClick();
      }}
      className={`${styles.button} ${isOutline ? styles.outline : ""} ${className}`}
    >
      {isAdd && <Plus size={16} className={styles.icon} />}
      {isEdit && <Edit size={16} className={styles.icon} />}

      <span className={`${styles.button__text}  ${isOutline ? styles.outline : ""}`}>
        {children}
      </span>
    </div>
  );
};

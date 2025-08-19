import { User } from "lucide-react";

import styles from "./style.module.scss";

type Props = {
  size?: number;
};

export const UserLogo = ({ size = 22 }: Props) => {
  return (
    <div
      style={{
        width: `${size + 10}px`,
        height: `${size + 10}px`,
      }}
      className={styles.user__logo}
    >
      <User size={size} color="#fff" />
    </div>
  );
};

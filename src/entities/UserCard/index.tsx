import React from "react";

import styles from "./style.module.scss";

export const UserCard = () => {
  return (
    <div className={styles.user__card}>
      <div className={styles.user}>U</div>
      <div className={styles.name__description}>
        <div>
          <span>User</span>
        </div>
        <div className={styles.description}>
          <span>offline</span>
        </div>
      </div>
    </div>
  );
};

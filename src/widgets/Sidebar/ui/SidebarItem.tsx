import React, { type ComponentType } from "react";

import styles from "./style.module.scss";

type Props = {
  Icon: ComponentType<{ className?: string | undefined }>;
  name: string;
  description: string;
};

export const SidebarItem = ({ Icon, name, description }: Props) => {
  return (
    <div className={styles.sidebar__item}>
      <div className={styles.icon__wrapper}>
        <Icon className={styles.icon} />
      </div>

      <div className={styles.name__description}>
        <div>
          <span>{name}</span>
        </div>
        <div className={styles.description}>
          <span>{description}</span>
        </div>
      </div>
    </div>
  );
};

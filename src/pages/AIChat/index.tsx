import { AIHeader } from "@/entities/AIHeader";
import { AIMessenger } from "@/entities/AIMessenger";

import styles from "./style.module.scss";

export const AIChat = () => {
  return (
    <section className={styles.AIChat}>
      <AIHeader />
      <AIMessenger />
    </section>
  );
};

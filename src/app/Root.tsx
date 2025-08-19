import { Route, Routes } from "react-router-dom";

import { AIChat } from "@/pages/AIChat";
import { Sidebar } from "@/widgets/Sidebar";

import styles from "./style.module.scss";

export const Root = () => {
  return (
    <>
      <div className={styles.root__layout}>
        <Sidebar />

        <Routes>
          <Route path="/" element={<AIChat />} />
        </Routes>
      </div>
    </>
  );
};

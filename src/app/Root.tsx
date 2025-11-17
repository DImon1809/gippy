import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { ThemeContext } from "@/app/providers/ThemeProvider";
import { useAppDispatch } from "@/app/store";
import { setAuthStatus, setUserName } from "@/features/user/userSlice";
import { AIChat } from "@/pages/AIChat";
import { Contacts } from "@/pages/Contacts";
import { NotFound } from "@/pages/NotFound";
import { Support } from "@/pages/Support";
import { Transactions } from "@/pages/Transactions";
import { Wallet } from "@/pages/Wallet";
import { Sidebar } from "@/widgets/Sidebar";

import "@rainbow-me/rainbowkit/styles.css";
import styles from "./style.module.scss";

export const Root = () => {
  const { theme } = useContext(ThemeContext);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    const userName = localStorage.getItem("userName");

    if (jwtToken) {
      dispatch(setAuthStatus(jwtToken));
    }

    if (userName) {
      dispatch(setUserName(userName));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={`${styles.root__layout} ${theme === "dark" ? styles.dark : ""}`}>
        <Sidebar />

        <Routes>
          <Route path="/" element={<AIChat />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

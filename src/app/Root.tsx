import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { setAuthStatus } from "@/features/user/userSlice";
import { AIChat } from "@/pages/AIChat";
import { Contacts } from "@/pages/Contacts";
import { NotFound } from "@/pages/NotFound";
import { Support } from "@/pages/Support";
import { Transactions } from "@/pages/Transactions";
import { Wallet } from "@/pages/Wallet";
import { Sidebar } from "@/widgets/Sidebar";

import { useAppDispatch } from "./store";

import styles from "./style.module.scss";

export const Root = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");

    if (jwtToken) {
      dispatch(setAuthStatus(jwtToken));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={styles.root__layout}>
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

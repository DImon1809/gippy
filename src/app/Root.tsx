import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AIChat } from "@/pages/AIChat";
import { Sidebar } from "@/widgets/Sidebar";

export const Root = () => {
  return (
    <BrowserRouter>
      <Sidebar />

      <Routes>
        <Route path="/" element={<AIChat />} />
      </Routes>
    </BrowserRouter>
  );
};

import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Root } from "@/app/Root";

import { ModalProvider } from "./providers/ModalProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { Web3Provider } from "./providers/Web3Provider";

export const App = () => {
  return (
    <Web3Provider>
      <BrowserRouter>
        <ThemeProvider>
          <ModalProvider>
            <Root />
            <ToastContainer />
          </ModalProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Web3Provider>
  );
};

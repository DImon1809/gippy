import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Root } from "@/app/Root";

import { ModalProvider } from "./providers/ModalProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { store } from "./store";

export const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ModalProvider>
          <Provider store={store}>
            <Root />
            <ToastContainer />
          </Provider>
        </ModalProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

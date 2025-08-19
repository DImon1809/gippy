import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

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
          </Provider>
        </ModalProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { Root } from "@/app/Root";

import { ModalProvider } from "./providers/ModalProvider";
import { store } from "./store";

export const App = () => {
  return (
    <BrowserRouter>
      <ModalProvider>
        <Provider store={store}>
          <Root />
        </Provider>
      </ModalProvider>
    </BrowserRouter>
  );
};

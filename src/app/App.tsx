import { Provider } from "react-redux";

import { Root } from "@/app/Root";

import { store } from "./store";

export const App = () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};

import React, { useCallback } from "react";

import { SettingsModal } from "@/entities/SettingsModal";

// import styles from "./style.module.scss";

const modalsMap = {
  settings: SettingsModal,
};

type ModalsType = keyof typeof modalsMap;

type OpenModal = <T extends ModalsType>(type: T) => void;

type ModalProviderState<T extends ModalsType | null> = {
  type: T;
  isOpen: boolean;
};

const ModalContext = React.createContext<{
  modalType: ModalsType | null;
  openModal: OpenModal;
}>({
  modalType: null,
  openModal: () => undefined,
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = React.useState<
    ModalProviderState<ModalsType | null>
  >({
    type: null,
    isOpen: false,
  });

  const Component = state.type
    ? (modalsMap as Record<string, React.ElementType>)[state.type]
    : null;

  const openModal: OpenModal = React.useCallback(
    (type) => {
      setState({
        type,
        isOpen: true,
      });
    },
    [setState]
  );

  const closeModal = useCallback(() => {
    setState({ type: null, isOpen: false });
  }, [setState]);

  return (
    <ModalContext.Provider value={{ modalType: state.type, openModal }}>
      {state.isOpen && Component && <Component closeModal={closeModal} />}
      {state.isOpen && <div onClick={() => closeModal()}></div>}
      <main>{children}</main>
    </ModalContext.Provider>
  );
};

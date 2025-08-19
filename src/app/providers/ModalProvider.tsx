import React, { useCallback } from "react";

import { SettingsModal } from "@/entities/SettingsModal";

import styles from "./style.module.scss";

const modalsMap = {
  settings: SettingsModal,
};

type ModalsType = keyof typeof modalsMap;

type OpenModal = <T extends ModalsType>(type: T) => void;

type ModalProviderState<T extends ModalsType | null> = {
  type: T;
  isOpen: boolean;
};

// eslint-disable-next-line react-refresh/only-export-components
export const ModalContext = React.createContext<{
  modalType: ModalsType | null;
  openModal: OpenModal;
  closeModal: () => void;
}>({
  modalType: null,
  openModal: () => undefined,
  closeModal: () => undefined,
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
    <ModalContext.Provider
      value={{ modalType: state.type, openModal, closeModal }}
    >
      {state.isOpen && Component && (
        <div className={styles.modal}>
          <Component closeModal={closeModal} />
        </div>
      )}
      {state.isOpen && (
        <div
          className={styles.global__wrapper}
          onClick={() => closeModal()}
        ></div>
      )}
      <main>{children}</main>
    </ModalContext.Provider>
  );
};

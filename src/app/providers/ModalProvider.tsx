import type { ComponentPropsWithoutRef } from "react";
import React, { useCallback } from "react";

import { ContactModal } from "@/entities/Modals/ContactModal";
import { SettingsModal } from "@/entities/Modals/SettingsModal";

import styles from "./style.module.scss";

const modalsMap = {
  settings: SettingsModal,
  contact: ContactModal,
};

type ModalsType = keyof typeof modalsMap;

type ModalProps<T extends ModalsType> = ComponentPropsWithoutRef<(typeof modalsMap)[T]>;

type OpenModal = <T extends ModalsType>(type: T, modalProps: ModalProps<T>) => void;

type ModalProviderState<T extends ModalsType | null> = {
  type: T;
  isOpen: boolean;
  modalProps: T extends ModalsType ? ModalProps<T> : null;
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
  const [state, setState] = React.useState<ModalProviderState<ModalsType | null>>({
    type: null,
    isOpen: false,
    modalProps: null,
  });

  const Component = state.type
    ? (modalsMap as Record<string, React.ElementType>)[state.type]
    : null;

  const openModal: OpenModal = React.useCallback(
    (type, modalProps) => {
      setState({
        type,
        isOpen: true,
        modalProps: modalProps,
      });
    },
    [setState],
  );

  const closeModal = useCallback(() => {
    setState({ type: null, isOpen: false, modalProps: null });
  }, [setState]);

  return (
    <ModalContext.Provider value={{ modalType: state.type, openModal, closeModal }}>
      {state.isOpen && Component && (
        <div className={styles.modal}>
          <Component {...(state.modalProps || {})} closeModal={closeModal} />
        </div>
      )}
      {state.isOpen && <div className={styles.global__wrapper} onClick={() => closeModal()}></div>}
      <main>{children}</main>
    </ModalContext.Provider>
  );
};

import React, { FC, ReactElement } from "react";

import { ModalContext, ModalContextState, ModalProps } from "./ModalContext";

type Props = {
  children: ReactElement;
};

const ModalProvider: FC<Props> = ({ children }) => {
  const [modals, setModals] = React.useState<ModalProps[]>([]);

  async function confirm(message: string): Promise<boolean> {
    return new Promise((resolve) => {
      const id = Math.random().toString(16).slice(2);
      setModals((prevModals) => [
        ...prevModals,
        {
          id,
          message,
          type: "confirm",
          onResolve: (value: boolean) => {
            setModals((prevModals) =>
              prevModals.filter((modal) => modal.id !== id)
            );
            resolve(value);
          },
        },
      ]);
    });
  }

  async function alert(message: string): Promise<void> {
    return new Promise((resolve) => {
      const id = Math.random().toString(16).slice(2);
      setModals((prevModals) => [
        ...prevModals,
        {
          id,
          message,
          type: "alert",
          onResolve: () => {
            setModals((prevModals) =>
              prevModals.filter((modal) => modal.id !== id)
            );
            resolve();
          },
        },
      ]);
    });
  }

  const state: ModalContextState = {
    modals,
    confirm,
    alert,
  };

  return (
    <ModalContext.Provider value={state}>{children}</ModalContext.Provider>
  );
};

export { ModalProvider };

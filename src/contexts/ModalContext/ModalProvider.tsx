import React, { FC, ReactElement, useMemo } from "react";

import { ModalContext, ModalContextState, ModalProps } from "./ModalContext";

type Props = {
  children: ReactElement;
};

const ModalProvider: FC<Props> = ({ children }) => {
  const [modals, setModals] = React.useState<ModalProps[]>([]);

  async function confirm(message: string): Promise<boolean> {
    return new Promise((resolve) => {
      setModals((prevModals) => [
        ...prevModals,
        {
          id: prevModals.length,
          message,
          type: "confirm",
          onResolve: (value: boolean) => {
            setModals((prevModals) =>
              prevModals.filter((modal) => modal.id !== prevModals.length - 1)
            );
            resolve(value);
          },
        },
      ]);
    });
  }

  async function alert(message: string): Promise<void> {
    return new Promise((resolve) => {
      setModals((prevModals) => [
        ...prevModals,
        {
          id: prevModals.length,
          message,
          type: "alert",
          onResolve: () => {
            setModals((prevModals) =>
              prevModals.filter((modal) => modal.id !== prevModals.length - 1)
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

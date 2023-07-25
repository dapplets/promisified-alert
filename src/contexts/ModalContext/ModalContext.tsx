import { createContext } from "react";

export type ModalProps = {
  id: string;
  message: string;
  type: "confirm" | "alert";
  onResolve: (value: boolean) => void;
};

export type ModalContextState = {
  modals: ModalProps[];
  confirm: (message: string) => Promise<boolean>;
  alert: (message: string) => Promise<void>;
};

export const contextDefaultValues: ModalContextState = {
  modals: [],
  confirm: async () => false,
  alert: async () => {},
};

export const ModalContext =
  createContext<ModalContextState>(contextDefaultValues);

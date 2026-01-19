import { create } from "zustand";
import type { ReactNode } from "react";

interface ModalState {
  modal: ReactNode | null;
  setModal: (content: ReactNode | null) => void;
}
export const useModalStore = create<ModalState>((set) => ({
  modal: null,
  setModal: (modal) => set({ modal }),
}));

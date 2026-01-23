import { create } from 'zustand';
import type { ReactNode } from 'react';

interface ModalState {
  modal: ReactNode | null;
  setModal: (content: ReactNode | null) => void;
  warn: string;
  setWarn: (warn: string) => void;
}
export const useModalStore = create<ModalState>((set) => ({
  modal: null,
  setModal: (modal) => set({ modal }),
  warn: '',
  setWarn: (warn) => set({ warn }),
}));

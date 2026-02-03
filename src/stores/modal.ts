import { create } from 'zustand';
import type { ComponentType } from 'react';

interface ModalState {
  modal: ComponentType<CommonModalProps & any> | null;
  payload: any;
  setModal: <T>(modal:ComponentType<CommonModalProps & T> | null, payload:T) => void;
}
export const useModalStore = create<ModalState>((set) => ({
  modal: null,
  payload: null,
  setModal: <T>(modal:ComponentType<CommonModalProps & T>|null, payload: T) => set({ modal, payload }),
}));

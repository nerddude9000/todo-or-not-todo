import { create } from "zustand";

export enum PopupKind {
  ADD_TASK,
  EDIT_TASK,
}

interface AppStateType {
  popupShown: PopupKind | null;
  setPopupShown: (newPopup: PopupKind) => void;
  closePopup: () => void;
}

export const useAppState = create<AppStateType>((set) => ({
  popupShown: null,
  setPopupShown: (newPopup) => set({ popupShown: newPopup }),
  closePopup: () => set({ popupShown: null }),
}));

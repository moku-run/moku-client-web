import { create } from "zustand";

export const useMatchingContainerStore = create((set) => ({
  isOpen: false,

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

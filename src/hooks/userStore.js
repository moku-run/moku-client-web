import { create } from "zustand";

export const useUserStore = create((set) => ({
  nickname: "",
  loginId: "",
  roomId: "",
  client: null,
  setRoomId: (roomId) => set({ roomId }),
  setUser: ({ nickname, loginId }) => set({ nickname, loginId }),
  resetUser: () => set({ nickname: "", loginId: "", roomId: "" }),
  resetRoom: () => set({ roomId: "" }),
  setClient: (client) => set({ client }),
}));

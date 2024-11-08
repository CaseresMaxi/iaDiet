import { create } from "zustand";

const useStoreSessionData = create((set) => ({
  userId: null,
  setUserId: (userId) => set({ userId }),
}));

export default useStoreSessionData;

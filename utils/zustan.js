import { create } from "zustand";

const useStoreSessionData = create((set) => ({
  userId: null,
  setUserId: (userId) => set({ userId }),
}));
export const useStore = create((set) => ({
  headerTitle: "Login",
  setHeaderTitle: (headerTitle) => set({ headerTitle }),
}));

export default useStoreSessionData;

import { create } from "zustand";
import Colors from "../styles/Colors";

const useStoreSessionData = create((set) => ({
  userId: null,
  setUserId: (userId) => set({ userId }),
}));
export const useStore = create((set) => ({
  headerTitle: "Login",
  headerColor: Colors.Color1,
  setHeaderColor: (headerColor) => set({ headerColor }),
  setHeaderTitle: (headerTitle) => set({ headerTitle }),
  navigationVisible: true,
  setNavigationVisible: (navigationVisible) => set({ navigationVisible }),
}));

export default useStoreSessionData;

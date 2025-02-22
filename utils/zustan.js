import { create } from "zustand";
import Colors from "../styles/Colors";

const useStoreSessionData = create((set) => ({
  userId: null,
  setUserId: (userId) => set({ userId }),
}));

export const useStore = create((set) => ({
  headerTitle: "Login",
  headerColor: Colors.Color1,
  leftTitle: null,
  headerVisible: true,
  setHeaderVisible: (headerVisible) => set({ headerVisible }),
  setLeftTitle: (leftTitle) => set({ leftTitle }),
  setHeaderColor: (headerColor) => set({ headerColor }),
  setHeaderTitle: (headerTitle) => set({ headerTitle }),
  navigationVisible: true,
  setNavigationVisible: (navigationVisible) => set({ navigationVisible }),
  triggerCamera: false,
  setTriggerCamera: (triggerCamera) => set({ triggerCamera }),
  chatVisible: false,
  setChatVisible: (chatVisible) => set({ chatVisible }),
  userData: {},
  setUserData: (userData) => set({ userData }),
  dietData: {},
  setDietData: (dietData) => set({ dietData }),
  dietChatContext: "",
  setDietChatContext: (dietChatContext) => set({ dietChatContext }),
}));

export default useStoreSessionData;

import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const styles = StyleSheet.create({
  dotContainer: {
    width: "fit-content",
    paddingVertical: 4,
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 4,
  },
  dot: {
    backgroundColor: Colors.Font2,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

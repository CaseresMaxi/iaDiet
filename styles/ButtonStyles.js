import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const buttonStyles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "fit-content",
    height: 45,
    backgroundColor: Colors.Color5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.Font2,
  },
  buttonText: {
    color: Colors.Font2,
    fontSize: 16,
    fontWeight: "bold",
    // width: 10,
    // height: 10,
    // borderRadius: 5,
    // backgroundColor: "#9880ff",
    // marginHorizontal: 2,
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "fit-content",
    height: 45,
    backgroundColor: Colors.Color1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
  },
  errorButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "fit-content",
    height: 45,
    backgroundColor: "red",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
  },
  secondaryButtonText: {
    color: Colors.Color4,
    fontSize: 16,
    fontWeight: "bold",
  },
  errorButtonText: {
    color: Colors.Font2,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default buttonStyles;

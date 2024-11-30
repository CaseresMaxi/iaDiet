import { StyleSheet } from "react-native";
import { Button } from "react-native-web";
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
    borderRadius: "100px",
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
});

export default buttonStyles;

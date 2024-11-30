import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const styles = StyleSheet.create({
  customInput: {
    height: 45,
    // borderColor: "#4E4C67", // Borde gris oscuro
    // borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 10,
    // width: "100%",
    backgroundColor: Colors.Font2, // Fondo oscuro para los inputs
    color: Colors.Color4, // Texto en blanco
  },
  label: {
    color: Colors.Font2, // Texto en blanco
    marginBottom: 5,
    paddingHorizontal: 12,
    fontWeight: "semibold",
  },
});

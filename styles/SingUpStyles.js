import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Color4, // Fondo oscuro
    justifyContent: "center",
    // alignItems: "center",
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.Color4, // Color morado para el encabezado
    height: "10%",
    zIndex: -1,
    fontWeight: "bold",
    fontSize: 24,
  },
  logoContainer: {
    backgroundColor: "#1E2028", // Fondo oscuro para el contenedor del logo
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontSize: 36,
    color: "#FFFFFF", // Logo en color blanco
  },
  formContainer: {
    // backgroundColor: "#1E2028", // Fondo oscuro para el formulario
    // padding: 20,
    height: "fit-content",
    justifyContent: "space-between",
    // borderRadius: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    width: 270,
    marginBottom: 20,
    color: "#FFFFFF", // Título en blanco
  },
  customInput: {
    height: 50,
    borderColor: "#4E4C67", // Borde gris oscuro
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: "#282C34", // Fondo oscuro para los inputs
    color: "#FFFFFF", // Texto en blanco
  },
  button: {
    backgroundColor: "#7F56DA", // Botón morado
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF", // Texto en blanco
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    textAlign: "center",
    marginTop: 20,
    color: "#B0B3C7", // Texto gris claro
  },
  linkText: {
    color: "#7F56DA", // Texto morado para los enlaces
    fontWeight: "bold",
  },
  errorText: {
    color: "#FF4D4F", // Texto de error en rojo
    fontSize: 12,
    marginBottom: 10,
  },
});

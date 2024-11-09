import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7F56DA", // Fondo oscuro
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#7F56DA", // Color morado para el encabezado
    height: "30%",
    zIndex: -1,
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
    backgroundColor: "#1E2028", // Fondo oscuro para el formulario
    padding: 20,
    marginTop: -50,
    height: "45%",
    justifyContent: "space-between",
    borderRadius: 30,
    // borderTopRightRadius: 30, // Bordes redondeados en la parte superior del formulario
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
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

import Colors from "./Colors";

const headerStyles = {
  headerContainer: {
    height: 48,
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "#232323",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Asegura espacio entre el botón y el título
    paddingHorizontal: 16, // Espaciado lateral
    zIndex: 1000,
  },
  backButtonContainer: {
    flex: 1, // Ocupa el espacio al inicio
    display: "flex",
    alignItems: "flex-start",
  },
  backButton: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    padding: 8,
    cursor: "pointer",
    textAlign: "center",
    backgroundColor: "transparent", // Sin fondo
  },
  headerTitle: {
    flex: 1, // Centra ocupando el espacio disponible
    textAlign: "center",
    color: Colors.Color1,
    fontSize: 20,
    fontWeight: "bold",
  },
  settingsIcon: {
    color: "#FFFFFF",
    fontSize: 24,
    cursor: "pointer",
  },
  settingsIconContainer: {
    flex: 1, // Ocupa el espacio al final
    display: "flex",
    alignItems: "flex-end",
  },
};
export default headerStyles;

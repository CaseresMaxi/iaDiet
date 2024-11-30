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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  },
  headerTitle: {
    color: Colors.Color1,
    fontSize: 20,
    fontWeight: "bold",
  },
  settingsIcon: {
    color: "#FFFFFF",
    fontSize: 24,
    cursor: "pointer",
  },
};
export default headerStyles;

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2E2E2E",
    borderRadius: 15,
    padding: 25,
    margin: 15,
    width: "90%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 1,
    borderColor: "rgb(78, 76, 103)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
    paddingBottom: 10,
    marginBottom: 15,
  },
  username: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  deleteButton: {
    color: "#FF4D4D",
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    marginTop: 10,
  },
  label: {
    color: "#AAAAAA",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
  },
  detail: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 5,
  },
});

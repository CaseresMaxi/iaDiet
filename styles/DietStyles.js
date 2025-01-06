import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    with: "100%",
    backgroundColor: Colors.Color4, // Dark background for the entire screen
    paddingHorizontal: 36,
    height: "100%",
    overflow: "auto",
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    marginBottom: 30,
  },
  header: {
    fontSize: 24,
    color: "#FFFFFF", // White for the header text
    fontWeight: "bold",
    // marginBottom: 20,
    textAlign: "center",
  },
  mealCard: {
    backgroundColor: Colors.Font2, // Dark card background
    borderRadius: 10,
    padding: 0,
    marginVertical: 10,
    width: "100%",
    flexDirection: "row",
  },
  mealTitle: {
    color: Colors.COlor4, // White color for meal title
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  mealDetails: {
    color: Colors.Color4, // Light gray for meal details
    fontSize: 12,
  },
  mealDetailsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 12,
    alignItems: "center",
  },
  mealImage: {
    width: "100px",
    height: "100px",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 24,
  },
});

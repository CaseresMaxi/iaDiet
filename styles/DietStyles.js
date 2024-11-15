import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark background for the entire screen
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    color: "#FFFFFF", // White for the header text
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  mealCard: {
    backgroundColor: "#2E2E2E", // Dark card background
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  mealTitle: {
    color: "#FFFFFF", // White color for meal title
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  mealDetails: {
    color: "#BFBFBF", // Light gray for meal details
    fontSize: 14,
  },
});

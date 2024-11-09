import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Diet() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <Text style={styles.header}>User's Diet</Text>

      <View style={styles.mealCard}>
        <Text style={styles.mealTitle}>Breakfast</Text>
        <Text style={styles.mealDetails}>Oatmeal with fruits and nuts</Text>
        <Text style={styles.mealDetails}>Calories: 350 kcal</Text>
      </View>

      <View style={styles.mealCard}>
        <Text style={styles.mealTitle}>Lunch</Text>
        <Text style={styles.mealDetails}>
          Grilled chicken with quinoa and vegetables
        </Text>
        <Text style={styles.mealDetails}>Calories: 600 kcal</Text>
      </View>

      <View style={styles.mealCard}>
        <Text style={styles.mealTitle}>Dinner</Text>
        <Text style={styles.mealDetails}>Salmon with steamed broccoli</Text>
        <Text style={styles.mealDetails}>Calories: 500 kcal</Text>
      </View>

      <View style={styles.mealCard}>
        <Text style={styles.mealTitle}>Snack</Text>
        <Text style={styles.mealDetails}>Greek yogurt with honey</Text>
        <Text style={styles.mealDetails}>Calories: 150 kcal</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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

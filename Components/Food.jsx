import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles/DietStyles";

const Food = ({ title = "", calories = 0, description = "" }) => {
  return (
    <View style={styles.mealCard}>
      <Text style={styles.mealTitle}>{title}</Text>
      <Text style={styles.mealDetails}>{description}</Text>
      <Text style={styles.mealDetails}>{`Calories: ${calories} kcal`}</Text>
    </View>
  );
};

export default Food;

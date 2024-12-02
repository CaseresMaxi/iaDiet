import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles/DietStyles";
import { Image } from "react-native-web";
import Calories from "../assets/icons/Calories.svg";
import Clock from "../assets/icons/Clock.svg";
import genericFood from "../assets/genericFood.jpg";
import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";

const Food = ({
  title = "",
  calories = 0,
  description = "",
  ingredients = {},
  stimatedTime = "",
  meal = "",
  dietId = "",
  instructions = "",
}) => {
  return (
    <Link
      style={styles.mealCard}
      href={`/foodDetail/${title}/${dietId}/${meal}/${stimatedTime}/${calories}/${description}/${
        ingredients
      }/${instructions}`}
      asChild
      replace={false}
    >
      <View>
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            padding: 24,
            paddingRight: 16,
          }}
        >
          <Text style={styles.mealTitle}>{title}</Text>
          <Text style={{ ...styles.mealDetails }}>{description}</Text>
          <View style={styles.mealDetailsContainer}>
            <Text style={styles.mealDetails}>
              <Image source={Clock}></Image>
              {` ${stimatedTime}`}
            </Text>
            <Text style={styles.mealDetails}>
              <Image source={Calories}></Image>
              {` ${calories} kcal`}
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image style={styles.mealImage} source={genericFood}></Image>
        </View>
      </View>
    </Link>
  );
};

export default Food;

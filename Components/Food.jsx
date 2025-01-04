import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "../styles/DietStyles";
import { Image } from "react-native";
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
  img = null,
  dietId = "",
  instructions = "",
  proteins,
  fats,
  carbs,
  linkeable = true,
  s3Img,
}) => {
  const [s3ImgB64, sets3ImgB64] = useState("");

  useEffect(() => {
    console.log(s3Img, "s3Img");
    fetch(s3Img)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text(); // Parse the response as plain text
      })
      .then((data) => {
        sets3ImgB64(data);
        // Optionally, do something with the base64 string
      })
      .catch((error) => {
        console.error("Error fetching the data:", error);
      });
  }, [s3Img]);
  const body = (
    <View style={{ flexDirection: "row" }}>
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
          {stimatedTime && (
            <Text style={styles.mealDetails}>
              <Image source={Clock}></Image>
              {` ${stimatedTime}`}
            </Text>
          )}
          <Text style={styles.mealDetails}>
            <Image source={Calories}></Image>
            {` ${calories} kcal`}
          </Text>
          {proteins && (
            <Text style={styles.mealDetails}>{` ${proteins} g`}</Text>
          )}
          {fats && <Text style={styles.mealDetails}>{` ${fats} g`}</Text>}
          {carbs && <Text style={styles.mealDetails}>{` ${carbs} g`}</Text>}
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={styles.mealImage}
          source={{ uri: s3ImgB64 || genericFood }}
        ></Image>
      </View>
    </View>
  );
  if (linkeable)
    return (
      <Link
        style={styles.mealCard}
        href={"/foodDetail/" + "/" + dietId + "/" + meal}
        // href={`/foodDetail/${title}/${dietId}/${meal}/${stimatedTime}/${calories}/${description}/${
        //   ingredients
        // }/${instructions}/${btoa(s3Img)}`}
        asChild
        replace={false}
      >
        {body}
      </Link>
    );
  else return <View style={{ ...styles.mealCard }}>{body}</View>;
};

export default Food;

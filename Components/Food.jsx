import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, Image } from "react-native";
import { styles } from "../styles/DietStyles";
import Calories from "../assets/icons/Calories.svg";
import Clock from "../assets/icons/Clock.svg";
import genericFood from "../assets/genericFood.jpg";
import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import Ai from "../assets/icons/ai.svg";

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
  id = "",
  carbs,
  linkeable = true,
  s3Img,
  generatedImg,
  enableGenerateImg = false,
  generatingImg = false,
  day = "",
}) => {
  const [s3ImgB64, sets3ImgB64] = useState("");
  const [imgLoading, setimgLoading] = useState(false);

  useEffect(() => {
    if (s3Img && !generatedImg) {
      setimgLoading(true);
      fetch(s3Img)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text(); // Parse the response as plain text
        })
        .then((data) => {
          sets3ImgB64(data);
        })
        .catch((error) => {
          console.error("Error fetching the data:", error);
        })
        .finally(() => {
          setimgLoading(false);
        });
    }
  }, [s3Img]);

  const body = (
    <View style={{ flexDirection: "row", width: "100%" }}>
      <View
        style={{
          width: "65%",
          flex: 1,
          // minWidth: "65%",
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
        {imgLoading || generatingImg ? (
          <View style={styles.mealImage}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <Image
            style={styles.mealImage}
            source={{ uri: s3ImgB64 || generatedImg }}
          ></Image>
        )}
      </View>
    </View>
  );

  if (linkeable)
    return (
      <Link
        style={styles.mealCard}
        href={"/foodDetail/" + "/" + dietId + "/" + meal + "/" + day}
        asChild
        replace={false}
      >
        {body}
      </Link>
    );
  else
    return (
      <View style={{ ...styles.mealCard }} key={id}>
        {body}
      </View>
    );
};

export default Food;

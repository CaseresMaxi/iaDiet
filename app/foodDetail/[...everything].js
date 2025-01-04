import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useStore } from "../../utils/zustan";
import { useEffect, useState } from "react";
import { FlatList, Image, Text } from "react-native";
import Colors from "../../styles/Colors";
import FoodImg from "../../assets/genericFood.jpg";
import Calories from "../../assets/icons/CaloriesColor.svg";
import Clock from "../../assets/icons/ClockColor.svg";
import { fetchDiet } from "../../services/Diet";

export default function Detail() {
  const insets = useSafeAreaInsets();
  const { everything } = useLocalSearchParams(); // Captura id y dietId
  console.log(everything);
  const setHeaderTitle = useStore((state) => state.setHeaderTitle);
  // const setLeftTitle = useStore((state) => state.setLeftTitle);
  const [s3ImgB64, sets3ImgB64] = useState("");
  const [dietData, setdietData] = useState({});
  const fetchImg = (s3Img) => {
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
  };

  useEffect(() => {
    console.log(dietData, "dietData");
    fetchImg(dietData.foods[everything[1]]?.s3_url);
  }, [dietData]);

  useEffect(() => {
    setHeaderTitle(
      ""
      // everything[2].slice(0, 1).toUpperCase() + everything[2].slice(1)
    );
    fetchDiet(setdietData);
    // setLeftTitle(everything[0]);
    return () => {
      setHeaderTitle("Diet");
      // setLeftTitle(null);
    };
  }, []);

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: 60,
        // paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: 32,
      }}
    >
      <View style={{ width: "100%" }}>
        <Text
          style={{ fontSize: 24, color: Colors.Color1, fontWeight: "Bold" }}
        >
          {dietData && dietData?.foods[everything[1]]?.title}
        </Text>
        <View style={{ flexDirection: "row", gap: 24 }}>
          <Text style={{ fontSize: 14, color: Colors.Font2 }}>
            <Image source={Clock} />{" "}
            {dietData && ` ${dietData?.foods[everything[1]]?.tiempo_estimado}`}
          </Text>
          <Text style={{ fontSize: 14, color: Colors.Font2 }}>
            <Image source={Calories} style={{ marginRight: 6 }} />
            {dietData && ` ${dietData?.foods[everything[1]]?.calorias} kcal`}
          </Text>
        </View>
        <Image
          style={{
            width: "100%",
            height: 200,
            borderRadius: 20,
            marginTop: 24,
          }}
          source={{ uri: s3ImgB64 }}
        ></Image>
        <View style={{ marginTop: 48 }}>
          <Text
            style={{
              fontSize: 24,
              color: Colors.Color1,
              fontWeight: "semibold",
            }}
          >
            Ingredientes
          </Text>
          <FlatList
            style={{ marginLeft: 12, marginTop: 8 }}
            // data={dietData?.foods[everything[1]]?.ingredientes} // Pasa el array como datos
            keyExtractor={(item, index) => index.toString()} // Genera claves únicas
            renderItem={({ item }) => (
              <Text style={styles.item}>{`• ${item}`}</Text> // Renderiza cada ingrediente
            )}
          />
        </View>
        <View style={{ marginTop: 24, gap: 12 }}>
          <Text
            style={{
              fontSize: 24,
              color: Colors.Color1,
              fontWeight: "semibold",
            }}
          >
            Preparation
          </Text>
          <Text
            style={{ fontSize: 18, fontWeight: "medium", color: Colors.Font2 }}
          >
            {/* {everything[7]} */}
          </Text>
        </View>
      </View>
      <Stack.Screen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Color4,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  item: {
    fontSize: 16,
    marginVertical: 2,
    fontWeight: "300",
    color: Colors.Font2,
  },
});

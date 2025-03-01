import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native-web";
import Calories from "../../assets/icons/CaloriesColor.svg";
import Clock from "../../assets/icons/ClockColor.svg";
import { fetchDiet } from "../../services/Diet";
import Colors from "../../styles/Colors";
import { useStore } from "../../utils/zustan";

export default function Detail() {
  const insets = useSafeAreaInsets();
  const { everything } = useLocalSearchParams(); // Captura id y dietId
  const setHeaderTitle = useStore((state) => state.setHeaderTitle);
  // const setLeftTitle = useStore((state) => state.setLeftTitle);
  const [s3ImgB64, sets3ImgB64] = useState("");
  const [dietData, setDietData] = useState();
  const [loading, setloading] = useState(true);
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
    fetchImg(dietData?.foods[everything[1]]?.s3_url);
  }, [dietData]);

  useEffect(() => {
    setHeaderTitle(
      ""
      // everything[2].slice(0, 1).toUpperCase() + everything[2].slice(1)
    );
    fetchDiet(setDietData, setloading);
    // setLeftTitle(everything[0]);
    return () => {
      setHeaderTitle("Diet");
      // setLeftTitle(null);
    };
  }, []);
  // console.log("everything", dietData);
  return (
    <View
      style={{
        ...styles.container,
        paddingTop: 60,
        // paddingTop: insets.top,
        paddingBottom: insets.bottom || 64,
        paddingHorizontal: 32,
      }}
    >
      <ScrollView>
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color={Colors.Color1} />
          </View>
        ) : (
          <View style={{ width: "100%" }}>
            <Text
              style={{ fontSize: 24, color: Colors.Color1, fontWeight: "Bold" }}
            >
              {dietData && dietData?.foods[everything[1]]?.title}
            </Text>
            <View style={{ flexDirection: "row", gap: 24 }}>
              <Text style={{ fontSize: 14, color: Colors.Font2 }}>
                <Image source={Clock} />{" "}
                {dietData &&
                  ` ${dietData?.foods[everything[1]]?.estimated_time}`}
              </Text>
              <Text style={{ fontSize: 14, color: Colors.Font2 }}>
                <Image source={Calories} style={{ marginRight: 6 }} />
                {dietData &&
                  ` ${dietData?.foods[everything[1]]?.total_calories} kcal`}
              </Text>
            </View>
            {s3ImgB64 ? (
              <Image
                style={{
                  width: "100%",
                  height: 200,
                  borderRadius: 20,
                  marginTop: 24,
                }}
                source={{ uri: s3ImgB64 }}
              />
            ) : (
              <View
                style={{
                  width: "100%",
                  height: 200,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 24,
                }}
              >
                <ActivityIndicator size="large" color={Colors.Color1} />
              </View>
            )}
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
                data={dietData?.foods[everything[1]]?.ingredients} // Pasa el array como datos
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
                style={{
                  fontSize: 18,
                  fontWeight: "medium",
                  color: Colors.Font2,
                }}
              >
                {dietData && dietData?.foods[everything[1]]?.instructions}
              </Text>
            </View>
          </View>
        )}
        <Stack.Screen />
      </ScrollView>
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

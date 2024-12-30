import { router, Stack } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useStore } from "../utils/zustan";
import { useEffect, useState } from "react";
import HeaderUser from "../assets/icons/HeaderUser.svg";
import Notification from "../assets/icons/Notification.svg";
import Food from "../Components/Food";
import Colors from "../styles/Colors";
import { ProgressBar } from "react-native-paper";
import { ScrollView, TouchableOpacity } from "react-native-web";
import { getIngests } from "../services/Ingests";

export default function Home() {
  const insets = useSafeAreaInsets();

  const setHeaderVisible = useStore((state) => state.setHeaderVisible);
  const setNavigationVisible = useStore((state) => state.setNavigationVisible);

  const [ingestData, setIngestData] = useState([]);

  useEffect(() => {
    setHeaderVisible(false);
    setNavigationVisible(true);
    getIngests(setIngestData);
    return () => {
      setHeaderVisible(true);
    };
  }, []);

  return (
    <ScrollView style={{ backgroundColor: Colors.Color4 }}>
      <View
        style={{
          ...styles.container,
          paddingTop: insets.top || 30,
          backgroundColor: Colors.Color4,
          paddingHorizontal: 36,
        }}
      >
        <Stack.Screen />
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <Text
            style={{ fontWeight: "bold", color: Colors.Color2, fontSize: 20 }}
          >
            Hi, maxi
          </Text>
          <View style={{ flexDirection: "row", gap: 20 }}>
            <Image style={{ width: 14, height: 18 }} source={Notification} />
            <TouchableOpacity onPress={() => router.push("/profile")}>
              <Image style={{ width: 14, height: 18 }} source={HeaderUser} />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontWeight: "bold",
              color: Colors.Color1,
              fontSize: 20,
              marginBottom: 12,
            }}
          >
            Today
          </Text>
          <View
            style={{
              backgroundColor: Colors.Color2,
              height: "fit-content",
              paddingHorizontal: 18,
              paddingVertical: 24,
              borderRadius: 24,
              gap: 8,
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                // flex: 1,
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              {/* <View>
              <ProgressBar progress={0.5} title="Carbs" />
            </View> */}
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.Font2,
                    fontWeight: 600,
                  }}
                >
                  Proteins:
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.Font2,
                    fontWeight: 600,
                  }}
                >
                  300g
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.Font2,
                    fontWeight: 600,
                  }}
                >
                  Fats:
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.Font2,
                    fontWeight: 600,
                  }}
                >
                  300g
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.Font2,
                    fontWeight: 600,
                  }}
                >
                  Carbs:
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: Colors.Font2,
                    fontWeight: 600,
                  }}
                >
                  300g
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.Font2,
                  fontWeight: 600,
                  marginBottom: 2,
                }}
              >
                2000/3000
              </Text>
              <View style={{ height: 10, width: "100%" }}>
                <ProgressBar
                  style={{ width: 300 }}
                  progress={0.6}
                  color={Colors.Font2}
                />
              </View>

              <Text
                style={{
                  fontSize: 14,
                  color: Colors.Font2,
                  fontWeight: 600,
                }}
              >
                Caloeries:
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 32 }}>
          <Text
            style={{ color: Colors.Color1, fontSize: 20, fontWeight: "bold" }}
          >
            Your lasts ingests
          </Text>
          <View>
            {ingestData.map((ingest) => (
              <Food
                key={ingest.id}
                title={ingest.ingest}
                calories={ingest.calories}
                stimatedTime={ingest.stimatedTime}
              ></Food>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
});

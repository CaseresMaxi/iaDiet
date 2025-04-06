import Main from "../Components/Main";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useStore } from "../utils/zustan";
import AdsterraAd from "../Components/Ads/AdsterraAd";

export default function Index() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProvider>
      {/* <CopilotProvider> */}
      <View
        style={{
          ...styles.container,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <Stack.Screen
          options={
            {
              // headerTitle: () => <Text>login</Text>,
              //   // headerLeft: () => null,
              //   headerShadowVisible: false,
              //   headerTransparent: true,
            }
          }
        />
        <Main />
        <View style={{ position: "absolute", bottom: 10, width: "100%" }}>
          <AdsterraAd
            options={`{
		'key' : 'f255d145b8b2ade65ac202c2eca1dd34',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	}`}
          />
        </View>
      </View>
      {/* </CopilotProvider> */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    justifyContent: "flex-start",
  },
});

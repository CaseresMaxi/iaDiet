import Main from "../Components/Main";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import { useEffect, useRef } from "react";
import { useStore } from "../utils/zustan";
import { renewToken } from "../services/Utils";
import { RenewTokenProvider } from "./Provider/RenewTokenProvider";
import { CopilotProvider } from "react-native-copilot";

export default function Index() {
  const insets = useSafeAreaInsets();
  const setHeaderTitle = useStore((state) => state.setHeaderTitle);
  const setNavigationVisible = useStore((state) => state.setNavigationVisible);
  useEffect(() => {
    setHeaderTitle("Login");
    setNavigationVisible(false);
    return () => {
      setNavigationVisible(true);
    };
  }, []);

  return (
    <RenewTokenProvider>
      <SafeAreaProvider>
        <CopilotProvider>
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
          </View>
        </CopilotProvider>
      </SafeAreaProvider>
    </RenewTokenProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    justifyContent: "flex-start",
  },
});

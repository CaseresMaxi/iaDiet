import Main from "../Components/Main";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { Stack } from "expo-router";

export default function Index() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <Stack.Screen
        options={{
          headerTitle: "",
          headerLeft: () => null,
          headerShadowVisible: false,
          headerTransparent: true,
        }}
      />
      <Main />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    justifyContent: "flex-start",
  },
});

import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SignUpForm from "../Components/SignUpForm";

export default function Signup() {
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
      // options={{
      //   headerTitle: () => <Text>""</Text>,
      //   headerLeft: () => null,
      //   headerShadowVisible: false,
      //   headerTransparent: true,
      // }}
      />
      <SignUpForm />
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

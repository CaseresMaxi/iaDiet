import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Main from "./Components/Main";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CopilotProvider } from "react-native-copilot";
import { useTranslation, initReactI18next } from "react-i18next";


export default function App() {
  return (
    <SafeAreaProvider>
        <CopilotProvider>
          <View style={styles.container}>
            <StatusBar style="auto" />
            <Main />
          </View>
        </CopilotProvider>
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

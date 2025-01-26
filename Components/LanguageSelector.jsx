import { useLanguage } from "../utils/useLanguage";
import { View, TouchableOpacity, Text } from "react-native";

export const LanguageSelector = () => {
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <TouchableOpacity
        onPress={() => changeLanguage("es")}
        style={{
          padding: 5,
          backgroundColor: currentLanguage === "es" ? "#ddd" : "transparent",
        }}
      >
        <Text>ES</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => changeLanguage("en")}
        style={{
          padding: 5,
          backgroundColor: currentLanguage === "en" ? "#ddd" : "transparent",
        }}
      >
        <Text>EN</Text>
      </TouchableOpacity>
    </View>
  );
};

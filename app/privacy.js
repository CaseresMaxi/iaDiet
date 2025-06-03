import { router } from "expo-router";
import { useEffect } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView } from "react-native-web";
import { useTranslation } from "react-i18next";
import ChevronBack from "../assets/icons/ChevronBack.svg";
import Colors from "../styles/Colors";
import { useStore } from "../utils/zustan";
import "../utils/i18n";

export default function Privacy() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const setHeaderVisible = useStore((state) => state.setHeaderVisible);
  const setNavigationVisible = useStore((state) => state.setNavigationVisible);

  useEffect(() => {
    setHeaderVisible(false);
    setNavigationVisible(false);
  }, []);

  const privacySections = [
    {
      title: t("privacy.sections.dataCollection.title"),
      content: t("privacy.sections.dataCollection.content"),
    },
    {
      title: t("privacy.sections.dataUsage.title"),
      content: t("privacy.sections.dataUsage.content"),
    },
    {
      title: t("privacy.sections.dataSharing.title"),
      content: t("privacy.sections.dataSharing.content"),
    },
    {
      title: t("privacy.sections.dataSecurity.title"),
      content: t("privacy.sections.dataSecurity.content"),
    },
    {
      title: t("privacy.sections.userRights.title"),
      content: t("privacy.sections.userRights.content"),
    },
    {
      title: t("privacy.sections.dataRetention.title"),
      content: t("privacy.sections.dataRetention.content"),
    },
    {
      title: t("privacy.sections.cookies.title"),
      content: t("privacy.sections.cookies.content"),
    },
    {
      title: t("privacy.sections.minors.title"),
      content: t("privacy.sections.minors.content"),
    },
    {
      title: t("privacy.sections.policyChanges.title"),
      content: t("privacy.sections.policyChanges.content"),
    },
    {
      title: t("privacy.sections.contact.title"),
      content: t("privacy.sections.contact.content"),
    },
  ];

  return (
    <ScrollView
      style={{
        backgroundColor: Colors.Color4,
        paddingTop: insets.top || 30,
      }}
    >
      <View style={{ paddingHorizontal: 24, paddingBottom: 100 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 30,
            paddingVertical: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginRight: 16 }}
          >
            <Image source={ChevronBack} resizeMode="cover" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: Colors.Color1,
              flex: 1,
            }}
          >
            {t("privacy.title")}
          </Text>
        </View>

        {/* Introduction */}
        <View style={{ marginBottom: 32 }}>
          <Text
            style={{
              fontSize: 16,
              color: Colors.Font2,
              lineHeight: 24,
              textAlign: "justify",
            }}
          >
            {t("privacy.introduction")}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Colors.Font2,
              marginTop: 16,
              fontStyle: "italic",
            }}
          >
            {t("privacy.lastUpdated")} {new Date().toLocaleDateString("es-ES")}
          </Text>
        </View>

        {/* Privacy Sections */}
        {privacySections.map((section, index) => (
          <View
            key={index}
            style={{
              backgroundColor: Colors.Color6,
              borderRadius: 12,
              padding: 20,
              marginBottom: 16,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: Colors.Color1,
                marginBottom: 12,
              }}
            >
              {section.title}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: Colors.Font2,
                lineHeight: 22,
                textAlign: "justify",
              }}
            >
              {section.content}
            </Text>
          </View>
        ))}

        {/* Footer */}
        <View
          style={{
            backgroundColor: Colors.Color1,
            borderRadius: 12,
            padding: 20,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            {t("privacy.footer.title")}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "white",
              textAlign: "center",
              lineHeight: 20,
            }}
          >
            {t("privacy.footer.content")}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

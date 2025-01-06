// import { Dropdown } from "antd";
import { router, Stack } from "expo-router";
import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import headerStyles from "../styles/HeaderStyles";
import ChevronBack from "../assets/icons/ChevronBack.svg";
import Colors from "../styles/Colors";
import Home from "../assets/icons/Home.svg";
import Ingest from "../assets/icons/Ingest.svg";
import Diets from "../assets/icons/Diets.svg";
import Scan from "../assets/icons/Scan.svg";
import NavBar from "../Components/NavBar/NavBar";
import { useStore } from "../utils/zustan";

const Layout = () => {
  const items = [
    {
      key: "1",
      label: "Tracker",
      extra: "🍌",
      onClick: () => {
        router.push("/tracker");
      },
    },
    {
      key: "2",
      label: "Diet",
      extra: "📓",
      onClick: () => {
        router.push("/diet");
      },
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: "Profile",
      extra: "🧑",
      onClick: () => {
        router.push("/profile");
      },
    },
    {
      key: "4",
      label: "Log Out",
      extra: "🔒",
      onClick: () => {
        try {
          window.sessionStorage?.removeItem("user_id");
          window.sessionStorage?.removeItem("token");
          router.push("/");
        } catch (error) {
          console.error("Failed to log out:", error);
        }
      },
    },
  ];
  const headerTitle = useStore((state) => state.headerTitle);
  const leftTitle = useStore((state) => state.leftTitle);
  const headerColor = useStore((state) => state.headerColor);
  const navigationVisible = useStore((state) => state.navigationVisible);
  const headerVisible = useStore((state) => state.headerVisible);
  return (
    <>
      <Stack
        screenOptions={{
          headerTitle: () => (
            <View style={headerStyles.headerContainer}>
              {/* Botón "asdasd" al inicio */}
              <TouchableOpacity
                style={headerStyles.backButtonContainer}
                onPress={() => router.back()}
              >
                <Text style={headerStyles.backButton}>
                  <Image source={ChevronBack} style={{ marginRight: 8 }} />
                  {leftTitle}
                </Text>
              </TouchableOpacity>

              {/* Título centrado */}
              <Text style={{ ...headerStyles.headerTitle, color: headerColor }}>
                {headerTitle}
              </Text>
              <View style={headerStyles.settingsIconContainer}></View>
            </View>
          ),
          headerLeft: () => {},
          header: headerVisible ? undefined : () => null,
          headerShadowVisible: false,
          headerTransparent: true,
        }}
      />
      {navigationVisible && (
        <NavBar
          butons={[
            { icon: Diets, onClick: () => router.push("/diet") },
            { icon: Home, onClick: () => router.push("/home") },
            { icon: Ingest, onClick: () => router.push("/tracker") },
            // { icon: Scan, onClick: () => router.push("/scan") },
          ]}
        />
      )}
      {/* <View style={headerStyles.headerContainer}>
        <Text style={headerStyles.headerTitle}>App Name 🍌</Text>
        <Dropdown menu={{ items }}>
          <Text style={headerStyles.settingsIcon}>⚙️</Text>
        </Dropdown>
      </View> */}
    </>
  );
};

export default Layout;

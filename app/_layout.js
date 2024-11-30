// import { Dropdown } from "antd";
import { router, Stack } from "expo-router";
import React from "react";
import { Text, View, TouchableOpacity } from "react-native-web";
import headerStyles from "../styles/HeaderStyles";
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
        window.sessionStorage.removeItem("user_id");
        window.sessionStorage.removeItem("token");
        router.push("/");
      },
    },
  ];
  const headerTitle = useStore((state) => state.headerTitle);
  return (
    <>
      <Stack
        screenOptions={{
          headerTitle: () => (
            <View style={headerStyles.headerContainer}>
              <Text style={headerStyles.headerTitle}>{headerTitle}</Text>
              {/* <Dropdown menu={{ items }}>
                <Text style={headerStyles.settingsIcon}>⚙️</Text>
              </Dropdown> */}
            </View>
          ),
          headerLeft: () => null,
          headerShadowVisible: false,
          headerTransparent: true,
        }}
      />
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

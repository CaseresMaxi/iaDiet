import { Dropdown } from "antd";
import { router, Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native-web";

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

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      <View style={headerStyles.headerContainer}>
        <Text style={headerStyles.headerTitle}>App Name 🍌</Text>
        <Dropdown menu={{ items }}>
          <Text style={headerStyles.settingsIcon}>⚙️</Text>
        </Dropdown>
      </View>
    </>
  );
};

const headerStyles = {
  headerContainer: {
    height: 48,
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "#7F56DA",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  settingsIcon: {
    color: "#FFFFFF",
    fontSize: 24,
    cursor: "pointer",
  },
};

export default Layout;

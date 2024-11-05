import { Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native-web";
import NavigationFooter, { URLS } from "../Components/NavigationFooter";

const Layout = () => {
  //   console.log(route.name);
  return (
    <>
      <Stack
        screenOptions={{
          headerTitle: "",
          headerShadowVisible: false,

          headerShown: false,
          // headerLeft: () => (
          //   <View style={{ marginLeft: 20 }}>
          //     <Text style={{ color: "#fff", fontSize: 24 }}>◉ Traker</Text>
          //   </View>
          // ),
          // headerStyle: {
          //   backgroundColor: "#000",
          // color: "white",
          // },
        }}
      />
      {/* <NavigationFooter /> */}
    </>
  );
};

export default Layout;

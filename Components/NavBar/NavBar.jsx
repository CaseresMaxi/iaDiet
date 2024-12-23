import React from "react";
import { Text, View } from "react-native";
import Colors from "../../styles/Colors";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";

const NavBar = ({ butons = [] }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        height: 60,
        backgroundColor: Colors.Color2,
      }}
    >
      {butons?.length > 0 &&
        butons.map((button, index) => {
          return (
            <View
              key={index}
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <TouchableOpacity onPress={button.onClick}>
                <Image source={button.icon} />
              </TouchableOpacity>
            </View>
          );
        })}

      {/* <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Image source={Diets} />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Image source={Ingest} />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Image source={Home} />
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Image source={Scan} />
      </View> */}
    </View>
  );
};

export default NavBar;

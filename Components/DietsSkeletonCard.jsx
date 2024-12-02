import React from "react";
import { View } from "react-native";
import Colors from "../styles/Colors";

const DietSkeletonCard = ({}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 20,
        padding: "24px",
        justifyContent: "center",
        // paddingVertical: 12,
        // paddingRight: 0,
        backgroundColor: Colors.Font2,
        height: 140,
        borderRadius: 10,
      }}
    >
      <View style={{ gap: 10 }}>
        <View
          style={{
            width: 140,
            height: 14,
            backgroundColor: Colors.Color3,
          }}
        ></View>
        <View
          style={{
            width: 180,
            height: 14,
            backgroundColor: Colors.Color3,
          }}
        ></View>
        <View
          style={{
            width: 180,
            height: 14,
            backgroundColor: Colors.Color3,
          }}
        ></View>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <View
            style={{
              width: 50,
              height: 14,
              backgroundColor: Colors.Color3,
            }}
          ></View>
          <View
            style={{
              width: 50,
              height: 14,
              backgroundColor: Colors.Color3,
            }}
          ></View>
        </View>
      </View>
      <View
        style={{
          width: 120,
          height: 100,
          borderRadius: 10,
          backgroundColor: Colors.Color3,
        }}
      ></View>
    </View>
  );
};

export default DietSkeletonCard;

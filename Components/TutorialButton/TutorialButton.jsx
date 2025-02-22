import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native-web";
import { useCopilot } from "react-native-copilot";
import TutorialModal from "../TutorialModal/TutorialModal";

const TutorialButton = ({
  onPress,
  //   iconName = "add",
  size = 24,
  color = "#FFFFFF",
  style,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { start } = useCopilot();
  return (
    <>
      <TouchableOpacity
        style={[styles.button, style]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>
          ?
        </Text>
      </TouchableOpacity>
      <TutorialModal
        visible={modalVisible}
        onConfirm={() => {
          start();
          setModalVisible(false);
        }}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "fixed",
    bottom: 70,
    right: 20,
    zIndex: 1000,
    width: 32,
    height: 32,
    opacity: 0.8,
    borderRadius: 32,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default TutorialButton;

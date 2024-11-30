import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import buttonStyles from "../../styles/ButtonStyles";

const Button = ({ text = "", onClick = () => {}, style, type, width }) => {
  return (
    <TouchableOpacity style={{ ...buttonStyles.button, width }} onPress={onClick}>
      <Text style={buttonStyles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default Button;

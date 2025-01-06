import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import buttonStyles from "../../styles/ButtonStyles";

const Button = ({ text = "", onClick = () => {}, style, type, width }) => {
  const ButtonVariant = {
    secondary: buttonStyles.secondaryButton,
    error: buttonStyles.errorButton,
  };
  const ButtonTextVariant = {
    secondary: buttonStyles.secondaryButtonText,
    error: buttonStyles.errorButtonText,
  };
  return (
    <TouchableOpacity
      style={{
        ...buttonStyles.button,
        ...ButtonVariant[type],
        width,
        ...style,
      }}
      onPress={onClick}
    >
      <Text style={{ ...buttonStyles.buttonText, ...ButtonTextVariant[type] }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default Button;

import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import buttonStyles from "../../styles/ButtonStyles";

const Button = ({
  text = "",
  onClick = () => {},
  style,
  type,
  width,
  disabled = false,
}) => {
  const ButtonVariant = {
    secondary: buttonStyles.secondaryButton,
    error: buttonStyles.errorButton,
  };
  const ButtonTextVariant = {
    secondary: buttonStyles.secondaryButtonText,
    error: buttonStyles.errorButtonText,
  };

  const disabledStyle = disabled ? { opacity: 0.6 } : {};

  return (
    <TouchableOpacity
      style={{
        ...buttonStyles.button,
        ...ButtonVariant[type],
        ...disabledStyle,
        width,
        ...style,
      }}
      onPress={disabled ? undefined : onClick}
      disabled={disabled}
    >
      <Text style={{ ...buttonStyles.buttonText, ...ButtonTextVariant[type] }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default Button;

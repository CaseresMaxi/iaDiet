import React, { useState } from "react";
import { TextInput, View, StyleSheet, Text } from "react-native";
import { styles } from "../../styles/InputStyles";

const FormInput = ({
  placeholder = "",
  value,
  onChangeText = () => {},
  onBlur,
  style,
  label = null,
  width = "100%",
  paddingHorizontal = 24,
  type = "default",
  password = false,
  email = false,
}) => {
  const handleChange = (text) => {
    if (type === "number") {
      // Solo permitir números y punto decimal
      const numericValue = text.replace(/[^0-9.]/g, "");
      // Evitar múltiples puntos decimales
      if (numericValue.split(".").length > 2) return;
      onChangeText(numericValue);
    } else {
      onChangeText(text);
    }
  };

  return (
    <View style={{ paddingHorizontal }}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        secureTextEntry={password}
        keyboardType={
          email ? "email-address" : type === "number" ? "numeric" : "default"
        }
        autoCapitalize={email ? "none" : "sentences"}
        placeholder={placeholder}
        value={value}
        onChangeText={handleChange}
        style={{
          ...styles.customInput,
          ...style,
          width: width,
        }}
        placeholderTextColor="#888"
        onBlur={onBlur}
      />
    </View>
  );
};

export default FormInput;

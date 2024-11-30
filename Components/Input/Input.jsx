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
}) => {
  return (
    <View style={{ paddingHorizontal }}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        type={type}
        // label={label}
        placeholder={placeholder}
        value={value}
        onChangeText={(texto) => onChangeText(texto)}
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

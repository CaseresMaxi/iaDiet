import React, { useState } from "react";
import { TextInput, View, StyleSheet, Text } from "react-native";
import { styles } from "../../styles/InputStyles";

const FormInput = ({
  placeholder = "",
  valor,
  setValor = () => {},
  onBlur,
  style,
  label = null,
  width = "100%",
  type = "default",
}) => {
  return (
    <View style={{ paddingHorizontal: 24 }}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        type={type}
        // label={label}
        placeholder={placeholder}
        value={valor}
        onChangeText={(texto) => setValor(texto)}
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

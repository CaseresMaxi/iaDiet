import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Colors from "../../styles/Colors";

const CheckBox = ({
  checked = false,
  onPress = () => {},
  label = "",
  style = {},
  textStyle = {},
}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={[styles.checkbox, checked && styles.checked]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      {label && <Text style={[styles.label, textStyle]}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: Colors.Font2,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    marginRight: 10,
  },
  checked: {
    backgroundColor: Colors.Color1,
    borderColor: Colors.Color1,
  },
  checkmark: {
    color: Colors.Color4,
    fontSize: 14,
    fontWeight: "bold",
  },
  label: {
    color: Colors.Font2,
    fontSize: 14,
    fontWeight: "500",
  },
});

export default CheckBox;

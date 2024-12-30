import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ProgressBar } from "react-native-paper";
import Colors from "../../styles/Colors";

const CustomProgressBar = ({ progress, title = "" }) => {
  // const [progress, setProgress] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setProgress((prev) => {
  //       if (prev >= 1) {
  //         clearInterval(interval);
  //         return 1;
  //       }
  //       return prev + 0.1;
  //     });
  //   }, 500);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <View style={styles.container}>
      <ProgressBar progress={progress} color={Colors.Font2} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    color: Colors.Font2,
    fontWeight: 600,
  },
});

export default CustomProgressBar;

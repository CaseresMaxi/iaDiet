import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "../Button/Button";
import SimpleModal from "../SimpleModal/SimpleModal";

const TutorialModal = ({
  visible,
  onConfirm = () => {},
  onClose = () => {},
}) => {
  return (
    <SimpleModal visible={visible} onClose={onClose}>
      <Text style={styles.title}>¿Tienes dudas?</Text>
      <Text style={styles.subtitle}>Aquí tienes un pequeño tutorial</Text>
      <View style={styles.buttonContainer}>
        <Button text="Tutorial" onClick={onConfirm} />
        <View style={styles.buttonSpacer} />
        <Button text="Cerrar" type="secondary" onClick={onClose} />
      </View>
    </SimpleModal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
    color: "#333333",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 24,
    textAlign: "center",
    color: "#666666",
    lineHeight: 24,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "column",
    gap: 12,
  },
  buttonSpacer: {
    height: 8,
  },
});

export default TutorialModal;

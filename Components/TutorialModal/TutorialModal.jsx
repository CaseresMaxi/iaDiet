import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import Button from "../Button/Button";

const TutorialModal = ({
  visible,
  onConfirm = () => {},
  onClose = () => {},
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>¿Tienes dudas?</Text>
          <Text style={styles.subtitle}>Aquí tienes un pequeño tutorial</Text>
          <View style={styles.buttonContainer}>
            <Button text="Tutorial" onClick={onConfirm} />
            <View style={styles.buttonSpacer} />
            <Button text="Cerrar" type="secondary" onClick={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalView: {
    margin: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    width: "90%",
    maxWidth: 400,
  },
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

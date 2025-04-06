import React, { useState } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import AdPopup from "./AdPopup";

const AdPopupExample = () => {
  const [showAdPopup, setShowAdPopup] = useState(false);

  // Opciones para el anuncio
  const adOptions = `{
  "key": "1885f232d31b1462afcc1fb4cfd193f0",
  "format": "iframe",
  "height": 250,
  "width": 300,
  "params": {}
}`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ejemplo de Popup con Publicidad</Text>

      <Button
        title="Mostrar Publicidad"
        onPress={() => setShowAdPopup(true)}
        color="#007bff"
      />
      {/* 
      <AdPopup
        isVisible={showAdPopup}
        onClose={() => setShowAdPopup(false)}
        adOptions={adOptions}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default AdPopupExample;

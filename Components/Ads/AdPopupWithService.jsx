import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AdPopup from "./AdPopup";
import AdPopupService from "./AdPopupService";

// Opciones para el anuncio
const adOptions = `{
  "key": "1885f232d31b1462afcc1fb4cfd193f0",
  "format": "iframe",
  "height": 250,
  "width": 300,
  "params": {}
}`;

const AdPopupWithService = () => {
  const [showAdPopup, setShowAdPopup] = useState(false);
  const [popupsInfo, setPopupsInfo] = useState({
    shown: 0,
    nextIn: 0,
  });

  // Inicializar el servicio de anuncios cuando el componente se monte
  useEffect(() => {
    // Configuración personalizada
    const config = {
      minTimeBetweenPopups: 2, // 2 minutos entre popups
      showOnFirstVisit: true, // Mostrar en primera visita
      maxPopupsPerSession: 5, // Máximo 5 popups por sesión
      initialDelay: 10, // 10 segundos antes del primer popup
    };

    // Inicializar el servicio
    AdPopupService.init(config, (shouldShow) => {
      setShowAdPopup(shouldShow);
    });

    // Cada segundo, actualizar la información de estado
    const infoInterval = setInterval(() => {
      updatePopupInfo();
    }, 1000);

    return () => {
      clearInterval(infoInterval);
    };
  }, []);

  // Actualizar información sobre popups mostrados y tiempo hasta el siguiente
  const updatePopupInfo = () => {
    const { popupsShown, lastPopupTime, config } = AdPopupService;

    let nextIn = 0;

    if (lastPopupTime) {
      const timeSinceLastPopup = (Date.now() - lastPopupTime) / 1000; // en segundos
      const totalWaitTime = config.minTimeBetweenPopups * 60; // en segundos
      nextIn = Math.max(0, totalWaitTime - timeSinceLastPopup);
    } else if (popupsShown === 0) {
      // Si aún no se ha mostrado ningún popup, mostrar el tiempo hasta el primero
      const timeSinceInit =
        (Date.now() - AdPopupService.sessionStartTime) / 1000;
      nextIn = Math.max(0, config.initialDelay - timeSinceInit);
    }

    setPopupsInfo({
      shown: popupsShown,
      nextIn: Math.floor(nextIn),
    });
  };

  // Manejar el cierre del popup
  const handleClose = () => {
    setShowAdPopup(false);
  };

  // Mostrar un popup inmediatamente
  const handleShowNow = () => {
    AdPopupService.forceShowPopup();
  };

  // Reiniciar el servicio
  const handleReset = () => {
    AdPopupService.reset();
    updatePopupInfo();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Demo de Popups Automáticos</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Popups mostrados: {popupsInfo.shown} /{" "}
          {AdPopupService.config?.maxPopupsPerSession || 3}
        </Text>

        {popupsInfo.nextIn > 0 && (
          <Text style={styles.infoText}>
            Próximo popup en: {Math.floor(popupsInfo.nextIn / 60)}m{" "}
            {popupsInfo.nextIn % 60}s
          </Text>
        )}
      </View>

      <View style={styles.buttonsContainer}>
        <Button title="Mostrar ahora" onPress={handleShowNow} color="#007bff" />

        <Button
          title="Reiniciar servicio"
          onPress={handleReset}
          color="#dc3545"
        />
      </View>
      {/* 
      <AdPopup
        isVisible={showAdPopup}
        onClose={handleClose}
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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default AdPopupWithService;

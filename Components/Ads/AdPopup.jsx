import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../../styles/Colors";
import { Platform } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

// Componente interno de anuncio específico para el popup
const PopupAd = ({ adOptions, onAdLoaded }) => {
  const adRef = React.useRef(null);
  const [key, setKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Función para cargar el anuncio
  const loadAd = () => {
    if (Platform.OS === "web" && adRef.current) {
      setIsLoading(true);
      // Notificar que el anuncio está cargando
      onAdLoaded(false);

      // Limpiar cualquier script previo
      while (adRef.current.firstChild) {
        adRef.current.removeChild(adRef.current.firstChild);
      }

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.innerHTML = `atOptions = ${adOptions.replace(/'/g, '"')};`;

      const scriptInvoke = document.createElement("script");
      scriptInvoke.type = "text/javascript";
      scriptInvoke.src =
        "//www.highperformanceformat.com/1885f232d31b1462afcc1fb4cfd193f0/invoke.js";

      scriptInvoke.onload = () => {
        setTimeout(() => {
          setIsLoading(false);
          // Notificar que el anuncio está cargado
          onAdLoaded(true);
        }, 500);
      };

      scriptInvoke.onerror = () => {
        console.error("Error al cargar el anuncio en el popup");
        setIsLoading(false);
        // Notificar que hubo un error al cargar
        onAdLoaded(false);
      };

      adRef.current.appendChild(script);
      adRef.current.appendChild(scriptInvoke);
    }
  };

  // Usar useFocusEffect para recargar el anuncio cuando el popup obtiene el foco
  useFocusEffect(
    React.useCallback(() => {
      setKey((prevKey) => prevKey + 1);

      const timer = setTimeout(() => {
        loadAd();
      }, 200);

      return () => clearTimeout(timer);
    }, [])
  );

  // También cargar en el montaje inicial
  useEffect(() => {
    loadAd();

    const reloadTimer = setTimeout(() => {
      if (isLoading) {
        loadAd();
      }
    }, 2000);

    return () => {
      clearTimeout(reloadTimer);
      // Limpiar el objeto global al desmontar
      if (Platform.OS === "web") {
        delete window.atOptions;
      }
    };
  }, [key, adOptions]);

  if (Platform.OS !== "web") {
    return null;
  }

  return (
    <View style={styles.adWrapper}>
      {isLoading && (
        <View style={styles.adLoading}>
          <ActivityIndicator size="large" color={Colors.Color1} />
        </View>
      )}
      <View
        key={key}
        ref={adRef}
        style={{
          width: "100%",
          minHeight: 250,
          opacity: isLoading ? 0 : 1,
        }}
      />
    </View>
  );
};

const AdPopup = ({ isVisible, onClose, adOptions }) => {
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [canClose, setCanClose] = useState(false);
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const insets = useSafeAreaInsets();

  // Reiniciar estados cuando el popup se abre o se cierra
  useEffect(() => {
    if (isVisible) {
      setTimeRemaining(5);
      setCanClose(false);
      setIsAdLoaded(false);
    }
  }, [isVisible]);

  // Manejar el temporizador cuando el anuncio está cargado
  useEffect(() => {
    let timer;

    if (isVisible && isAdLoaded && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            setCanClose(true);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isVisible, isAdLoaded, timeRemaining]);

  const handleAdLoaded = (loaded) => {
    console.log("Ad loaded status:", loaded);
    setIsAdLoaded(loaded);
  };

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="fade"
      onRequestClose={() => {
        if (canClose) onClose();
      }}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.popup}>
          <View style={styles.header}>
            <Text style={styles.title}>Publicidad</Text>
            <TouchableOpacity
              style={[
                styles.closeButton,
                !canClose && styles.closeButtonDisabled,
              ]}
              onPress={() => canClose && onClose()}
              disabled={!canClose}
            >
              {canClose ? (
                <Text style={styles.closeButtonText}>✕</Text>
              ) : (
                <Text style={styles.timerText}>
                  {!isAdLoaded ? "..." : `${timeRemaining}s`}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.adContainer}>
            <PopupAd adOptions={adOptions} onAdLoaded={handleAdLoaded} />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {!isAdLoaded
                ? "Cargando publicidad..."
                : canClose
                  ? "Puedes cerrar esta publicidad"
                  : `Espera ${timeRemaining} segundos para cerrar`}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: "90%",
    maxWidth: 500,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.Color2 || "#ff5454",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonDisabled: {
    backgroundColor: "#aaa",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  timerText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  adContainer: {
    width: "100%",
    minHeight: 250,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    alignItems: "center",
  },
  footerText: {
    color: "#666",
    fontSize: 14,
  },
  adWrapper: {
    width: "100%",
    minHeight: 250,
    position: "relative",
  },
  adLoading: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    zIndex: 2,
  },
});

export default AdPopup;

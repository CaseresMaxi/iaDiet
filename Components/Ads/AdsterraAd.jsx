import React, { useEffect, useRef, useState } from "react";
import { Platform, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const AdsterraAd = ({ options = `{}` }) => {
  const adRef = useRef(null);
  const [key, setKey] = useState(0);

  // Función para cargar el anuncio
  const loadAd = () => {
    if (Platform.OS === "web" && adRef.current) {
      // Limpiar cualquier script previo
      while (adRef.current.firstChild) {
        adRef.current.removeChild(adRef.current.firstChild);
      }

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.innerHTML = `atOptions = ${options.replace(/'/g, '"')};`;

      const scriptInvoke = document.createElement("script");
      scriptInvoke.type = "text/javascript";
      scriptInvoke.src =
        "//www.highperformanceformat.com/1885f232d31b1462afcc1fb4cfd193f0/invoke.js";

      adRef.current.appendChild(script);
      adRef.current.appendChild(scriptInvoke);
    }
  };

  // Usar useFocusEffect para recargar el anuncio cuando la pantalla obtiene el foco
  useFocusEffect(
    React.useCallback(() => {
      // Forzar recarga del componente con un nuevo key
      setKey((prevKey) => prevKey + 1);

      // Pequeño delay para asegurar que el DOM esté listo
      const timer = setTimeout(() => {
        loadAd();
      }, 200);

      return () => clearTimeout(timer);
    }, [])
  );

  // También cargar en el montaje inicial
  useEffect(() => {
    loadAd();

    // Intentar recargar después de un tiempo para asegurar carga
    const reloadTimer = setTimeout(() => {
      loadAd();
    }, 1000);

    return () => clearTimeout(reloadTimer);
  }, [key, options]);

  if (Platform.OS !== "web") {
    return null; // o un placeholder en móvil
  }

  return (
    <View
      key={key}
      ref={adRef}
      style={{
        width: "100%",
        minHeight: 90,
        // marginVertical: 20,
        overflow: "hidden",
        alignSelf: "center",
        justifyContent: "center",
      }}
    />
  );
};

export default AdsterraAd;

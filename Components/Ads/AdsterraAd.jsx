import React, { useEffect, useRef } from "react";
import { Platform, View } from "react-native";

const AdsterraAd = ({ options = `{}` }) => {
  const adRef = useRef(null);

  useEffect(() => {
    // console.log(options);
    if (Platform.OS === "web" && adRef.current) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.innerHTML = `
        atOptions = ${options};
      `;
      const scriptInvoke = document.createElement("script");
      scriptInvoke.type = "text/javascript";
      scriptInvoke.src =
        "//www.highperformanceformat.com/1885f232d31b1462afcc1fb4cfd193f0/invoke.js";

      adRef.current.appendChild(script);
      adRef.current.appendChild(scriptInvoke);
    }
  }, [options]);

  if (Platform.OS !== "web") {
    return null; // o un placeholder en móvil
  }

  return (
    <View
      ref={adRef}
      style={{
        width: "100%",
        minHeight: 90,
        marginVertical: 20,
        overflow: "hidden",
        alignSelf: "center",
        alignItems: "center",
      }}
    />
  );
};

export default AdsterraAd;

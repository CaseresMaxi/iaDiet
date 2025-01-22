import React, { createContext, useEffect, useRef } from "react";
import { renewToken } from "../../services/Utils";

export const PollingContext = createContext({});

export const RenewTokenProvider = ({ children }) => {
  const intervalRef = useRef(null);
  useEffect(() => {
    const renewTokenFetch = async () => {
      try {
        await renewToken();
      } catch (error) {
        console.error("Error al renovar el token:", error);
      }
    };

    // Llamada inicial
    renewTokenFetch();

    // Configuración del intervalo
    if (!intervalRef.current)
      intervalRef.current = setInterval(renewTokenFetch, 60000 * 2);

    // Limpieza del intervalo cuando el componente se desmonta
    return () => {
      clearInterval(interval);
    };
  }, []); // [] asegura que solo se configure al montar el componente
  return (
    <PollingContext.Provider value={{}}>{children}</PollingContext.Provider>
  );
};

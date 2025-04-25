import React, { createContext, useEffect, useRef } from "react";
import AuthService from "../../services/Auth";

export const PollingContext = createContext({});

export const RenewTokenProvider = ({ children }) => {
  const intervalRef = useRef(null);

  useEffect(() => {
    const renewTokenFetch = async () => {
      try {
        if (AuthService.isAuthenticated()) {
          await AuthService.renewToken();
        }
      } catch (error) {
        console.error("Error al renovar el token:", error);
      }
    };

    // Llamada inicial
    renewTokenFetch();

    // Configuración del intervalo (cada 5 minutos)
    if (!intervalRef.current) {
      intervalRef.current = setInterval(renewTokenFetch, 5 * 60 * 1000);
    }

    // Limpieza del intervalo cuando el componente se desmonta
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <PollingContext.Provider value={{}}>{children}</PollingContext.Provider>
  );
};

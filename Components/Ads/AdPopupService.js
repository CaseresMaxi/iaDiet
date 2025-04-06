// AdPopupService.js
// Servicio para gestionar la aparición de popups de publicidad

// Configuración por defecto
const DEFAULT_CONFIG = {
  // Tiempo mínimo entre popups (en minutos)
  minTimeBetweenPopups: 5,

  // Si debe mostrar el popup en la primera visita
  showOnFirstVisit: false,

  // Número máximo de popups por sesión
  maxPopupsPerSession: 3,

  // Tiempo inicial antes de mostrar el primer popup (en segundos)
  initialDelay: 30,
};

class AdPopupService {
  constructor() {
    this.config = { ...DEFAULT_CONFIG };
    this.popupsShown = 0;
    this.lastPopupTime = null;
    this.sessionStartTime = Date.now();
    this.initialized = false;
    this.popupCallback = null;
  }

  // Inicializar el servicio con configuración personalizada
  init(customConfig = {}, popupCallback) {
    this.config = { ...DEFAULT_CONFIG, ...customConfig };
    this.popupCallback = popupCallback;
    this.initialized = true;

    // Cargar datos de sesión anteriores si existen
    this.loadSessionData();

    // Iniciar el temporizador para el primer popup
    if (this.shouldShowPopup()) {
      this.scheduleNextPopup();
    }

    return this;
  }

  // Cargar datos de sesión anteriores del localStorage (solo en web)
  loadSessionData() {
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        const sessionData = JSON.parse(
          window.localStorage.getItem("adPopupSessionData")
        );

        if (sessionData) {
          // Solo recuperamos datos de la misma sesión (última hora)
          const isCurrentSession =
            Date.now() - sessionData.lastPopupTime < 60 * 60 * 1000;

          if (isCurrentSession) {
            this.popupsShown = sessionData.popupsShown || 0;
            this.lastPopupTime = sessionData.lastPopupTime;
          }
        }
      } catch (error) {
        console.error("Error loading ad popup session data", error);
      }
    }
  }

  // Guardar datos de sesión en localStorage (solo en web)
  saveSessionData() {
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        window.localStorage.setItem(
          "adPopupSessionData",
          JSON.stringify({
            popupsShown: this.popupsShown,
            lastPopupTime: this.lastPopupTime,
          })
        );
      } catch (error) {
        console.error("Error saving ad popup session data", error);
      }
    }
  }

  // Decidir si se debe mostrar un popup
  shouldShowPopup() {
    // No mostrar si no está inicializado o no hay callback
    if (!this.initialized || !this.popupCallback) {
      return false;
    }

    // No mostrar si ya se alcanzó el límite de popups por sesión
    if (this.popupsShown >= this.config.maxPopupsPerSession) {
      return false;
    }

    // Si es la primera visita y la configuración dice que no se debe mostrar
    if (this.popupsShown === 0 && !this.config.showOnFirstVisit) {
      return false;
    }

    // Verificar si ha pasado suficiente tiempo desde el último popup
    if (this.lastPopupTime) {
      const minutesSinceLastPopup =
        (Date.now() - this.lastPopupTime) / (1000 * 60);

      if (minutesSinceLastPopup < this.config.minTimeBetweenPopups) {
        return false;
      }
    }

    return true;
  }

  // Programar el próximo popup
  scheduleNextPopup() {
    if (!this.shouldShowPopup()) {
      return;
    }

    let delay = this.config.initialDelay * 1000;

    // Si no es el primer popup, usar el tiempo entre popups
    if (this.popupsShown > 0) {
      delay = this.config.minTimeBetweenPopups * 60 * 1000;
    }

    setTimeout(() => {
      this.showPopup();
    }, delay);
  }

  // Mostrar un popup de publicidad
  showPopup() {
    if (this.shouldShowPopup() && this.popupCallback) {
      // Llamar al callback para mostrar el popup
      this.popupCallback(true);

      // Actualizar el contador y el tiempo
      this.popupsShown += 1;
      this.lastPopupTime = Date.now();

      // Guardar los datos de la sesión
      this.saveSessionData();

      // Programar el siguiente popup
      this.scheduleNextPopup();
    }
  }

  // Forzar la visualización de un popup inmediatamente
  forceShowPopup() {
    if (this.popupCallback) {
      this.popupCallback(true);
      this.popupsShown += 1;
      this.lastPopupTime = Date.now();
      this.saveSessionData();
    }
  }

  // Resetear el servicio
  reset() {
    this.popupsShown = 0;
    this.lastPopupTime = null;
    this.sessionStartTime = Date.now();

    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.removeItem("adPopupSessionData");
    }
  }
}

// Exportar una instancia única del servicio (patrón singleton)
export default new AdPopupService();

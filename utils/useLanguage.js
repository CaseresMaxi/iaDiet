import { useTranslation } from "react-i18next";
import { useCallback } from "react";

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = useCallback(
    (language) => {
      i18n.changeLanguage(language);
    },
    [i18n]
  );

  return {
    currentLanguage: i18n.language,
    changeLanguage,
    isRTL: i18n.dir() === "rtl",
  };
};

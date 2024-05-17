import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en/tranlation.json";
import trTranslation from "./locales/tr/translation.json";

const resources = {
  en: {
    translation: enTranslation
  },
  tr: {
    translation: trTranslation
  }
};

i18n
  .use(initReactI18next)
  .init({
    lng: "tr", // Başlangıç dili tr olacak
    resources
  });

export default i18n;


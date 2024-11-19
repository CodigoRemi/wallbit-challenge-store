import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import English from "../translations/English.json";
import Spanish from "../translations/Spanish.json";

const resources = {
  en: {
    translation: English,
  },
  es: {
    translation: Spanish,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "es",
});

export default i18next;

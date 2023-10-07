import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

// import translationEn from "./locales/en/translation.json";
// import translationZh from "./locales/zh/translation.json";
// import addPartEn from "./locales/en/addPart.json";
// import addPartZh from "./locales/zh/addPart.json";

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: "zh", // 
    
    ns: ['common'],   // 没有这个，则会加载translation.json（默认）
    defaultNS: 'common',

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    // resources: {
    //   en: {
    //     common: translationEn,
    //     // addPart: addPartEn,
    //     // common: () => import("./locales/en/translation.json"),
    //     // addPart: () => import("./locales/en/addPart.json"),
    //   },
    //   zh: {
    //     // common: () => import("./locales/zh/translation.json"),
    //     // addPart: () => import("./locales/zh/addPart.json"),
    //     common: translationZh,
    //     // addPart: addPartZh,
    //   },
    // },
  });

export default i18n;

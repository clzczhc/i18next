## 1.

```js
import React from "react";

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        React: "Welcome to React and react-i18next",
        Vue: "Welcome to Vue",
      },
    },
  },
  lng: "en",
  fallbackLng: "zh", // 备选语言（当lng对应语言资源不存在时）

  interpolation: {
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
});

export default function HomepageFeatures(): JSX.Element {
  const { t } = useTranslation();
  return <h2>{t("Vue")}</h2>;
}
```

## 2.

i18n.js

```js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      React: "Welcome to React",
      Vue: "Welcome to Vue",
    },
  },
  fr: {
    translation: {
      Vue: "Welcome to Vue",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en", // 备选语言（当lng对应语言资源不存在时）

  interpolation: {
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
});

export default i18n;
```

index.js

```js
import React from "react";
import { useTranslation } from "react-i18next";

import i18n from "./i18next";

export default function HomepageFeatures(): JSX.Element {
  return <h2>{i18n.t("Vue")}</h2>;
}
```

## 3.

将翻译文件与代码拆分，
`yarn add i18next-http-backend --dev`

在 public 下面创建 locales 目录，在这个目录下创建和语言缩写对应的文件夹，其中放置 translation.json 文件。这个命名是约定好的，backend 插件会去按照这个路径请求资源文件

i18n.js

```js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: "en", // 备选语言（当lng对应语言资源不存在时）

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });

export default i18n;
```

`public/locales/en/translation.json`

```json
{
  "React": "Welcome to React",
  "Vue": "Welcome to Vue"
}
```

```
// 文档: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // 注入 react-i18next 实例
  .use(initReactI18next)
```

## 3. 语言切换

```js
import { Translation, useTranslation } from "react-i18next";

import logo from "./logo.svg";
import "./App.css";

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <h1>{t("Vue")}</h1>
      <button onClick={() => changeLanguage("en")}>en</button>
      <button onClick={() => changeLanguage("zh")}>zh</button>
    </>
  );
}

export default App;
```

## 4. 模块

i18n.js

```js
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
    fallbackLng: "en", // 备选语言

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
```

App.js

```js
import { useTranslation } from "react-i18next";
import { useState } from "react";

import "./App.css";

function App() {
  const { t, i18n } = useTranslation("common");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const [show, setShow] = useState(false);

  const addPart = () => {
    i18n.loadNamespaces("addPart", (err) => {
      if (!err) {
        setShow(true);
      }
    });
  };

  return (
    <>
      <h1>{t("Vue")}</h1>
      <button onClick={() => changeLanguage("en")}>en</button>
      <button onClick={() => changeLanguage("zh")}>zh</button>
      <button onClick={() => changeLanguage("fr")}>fr</button>
      <button onClick={() => addPart()}>addPart</button>

      {show && <h1>{t("name", { ns: "addPart" })}</h1>}
    </>
  );
}

export default App;
```

> loadNamespaces 时，好像会不只是加载当前语言的，而且还会加载`fallbackLng`的，可能是保险之类的原因。

## 5.完善

i18n.js
```js
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
```

App.js
```js
import { useTranslation } from "react-i18next";
import { useState } from "react";

import "./App.css";

function App() {
  // common.json是默认的翻译资源，所以可传可不传
  const { t, i18n } = useTranslation(); /* useTranslation("common") */;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const [show, setShow] = useState(false);

  const addPart = () => {
    i18n.loadNamespaces("addPart", (err) => {
      if (!err) {
        setShow(true);
      }
    });
  };

  return (
    <>
      <h1>{t("React")}</h1>
      <button onClick={() => changeLanguage("en")}>en</button>
      <button onClick={() => changeLanguage("zh")}>zh</button>
      <button onClick={() => changeLanguage("fr")}>fr</button>
      <button onClick={() => addPart()}>addPart</button>

      {show && <h1>{t("name", { ns: "addPart" })}</h1>}
    </>
  );
}

export default App;

```
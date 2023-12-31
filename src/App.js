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

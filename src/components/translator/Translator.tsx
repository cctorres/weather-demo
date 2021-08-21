import {useState} from "react";
import { useTranslation } from "react-i18next";
import "./Translator.css";

const Translator = () => {
  const [t, i18n] = useTranslation("global");
  const [selectedLanguage, setSelectedLanguage] = useState("English ")

  const changeLanguage = (lang: string, language: string) => {
    i18n.changeLanguage(lang) && localStorage.setItem("language", lang)
    setSelectedLanguage(language)
  }
  return (
    <div className="dropdown">
      <div className="dropdown-select">
        <span className="select">{selectedLanguage} ▼</span>
      </div>
      <div className="dropdown-list">
        <button className="dropdown-list-item" onClick={() => changeLanguage("en", "English ")}>English</button>
        <button className="dropdown-list-item" onClick={() => changeLanguage("es", "Español ")}>Español</button>
        <button className="dropdown-list-item" onClick={() => changeLanguage("ch", "中文" )}>中文</button>
      </div>
    </div>
  );
};

export default Translator;

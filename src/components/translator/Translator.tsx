import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./Translator.css";
import ukIcon from '../../utils/assets/icons/uk_flag.jpg'
import spIcon from '../../utils/assets/icons/sp_flag.png'
import chIcon from '../../utils/assets/icons/ch_flag.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const Translator = () => {
  const [t, i18n] = useTranslation("global");
  const [lang, setLang] = useState<string>(localStorage.getItem("language") || 'en');

  const handleChangeLang = (selectedLang: string) => {
    i18n.changeLanguage(selectedLang);
    localStorage.setItem("language", selectedLang);
    setLang(selectedLang);
  };

  const handleLangMenu = (ulElement: HTMLUListElement) => {
    if (ulElement.className.includes("disable")) {
      ulElement.className = ulElement.className.replace("disable", "enable")
    } else if (ulElement.className.includes("enable")) {
      ulElement.className = ulElement.className.replace("enable", "disable")
    }
  }

  let renderLanguageComponent = () =>{
    switch (lang) {
      case "en":
        return <div className="langSelectedContainer"><img src={ukIcon} alt=""/><span>EN</span><FontAwesomeIcon icon={faAngleDown} /></div>;
      case "es":
        return <div className="langSelectedContainer"><img src={spIcon} alt=""/><span>ES</span><FontAwesomeIcon icon={faAngleDown} /></div>;
      case "zh":
        return <div className="langSelectedContainer"><img src={chIcon} alt=""/><span>中文</span><FontAwesomeIcon icon={faAngleDown} /></div>;
      default:
        return <span>{lang}</span>;
    }
  };

  useEffect(() => {
    const storedLang = localStorage.getItem("language");
    if (storedLang) {
      if (i18n.language !== storedLang) {
        i18n.changeLanguage(storedLang);
      }
      setLang(storedLang);
    }
  }, [i18n]);

  return (
    <div className="translator-container">
      <ul className="dropdown-list-disable" onClick={(e) => handleLangMenu(e.currentTarget)}>
        {renderLanguageComponent()}
        <li className="dropdown-list-first-li" onClick={() => handleChangeLang("en")}>EN</li>
        <li onClick={() => handleChangeLang("es")}>ES</li>
        <li onClick={() => handleChangeLang("zh")}>中文</li>
      </ul>
    </div>
  );
};

export default Translator;

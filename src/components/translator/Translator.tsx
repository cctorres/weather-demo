import React from 'react'
import { useTranslation } from 'react-i18next'

const Translator = () => {
    const [t, i18n] = useTranslation("global");
    return (
        <div>            
            <button className="button" onClick={() => i18n.changeLanguage("en") && localStorage.setItem("language", "en")}>En</button>
            <button className="button" onClick={() => i18n.changeLanguage("es") && localStorage.setItem("language", "es")}>Es</button>
            <button className="button" onClick={() => i18n.changeLanguage("ch") && localStorage.setItem("language", "zh_cn")}>Ch</button>
        </div>
    )
}

export default Translator

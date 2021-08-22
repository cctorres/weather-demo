import { useTranslation } from "react-i18next";
import "./Translator.css";

const Translator = () => {
  const [t, i18n] = useTranslation("global");

  const handleChange = (event: any) => {
    i18n.changeLanguage(event.target.value);
    localStorage.setItem("language", event.target.value);
  };
  return (
    <div className="translator-container">
      <select className="dropdown-list-item" onChange={handleChange}>
        <option className="dropdown-list-item" selected value="en">
          English
        </option>
        <option className="dropdown-list-item" value="es">
          Español
        </option>
        <option className="dropdown-list-item" value="zh">
          中文
        </option>
      </select>
    </div>
  );
};

export default Translator;

import "./Footer.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const [t] = useTranslation("global");
  return (
    <>
      <div className="footer">{t("footer.footerText")} <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI</a> </div>
    </>
  );
};

export default Footer;

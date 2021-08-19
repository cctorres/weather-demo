import "./Footer.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const [t] = useTranslation("global");
  return (
    <>
      <div className="footer">{t("footer.footerText")}</div>
    </>
  );
};

export default Footer;

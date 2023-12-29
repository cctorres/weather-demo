import React from "react";
import { useTranslation } from "react-i18next";
import IForecast from "../../utils/interfaces/IForecast";
import "./Forecast.css";

type Props = {
  forecasts: IForecast[];
};

const Forecast: React.FC<Props> = ({ forecasts }) => {
  const [t] = useTranslation("global");

  return (
    <div className="another-weather">
      {forecasts.map((forecast, index) => (
        <div className="another-weather-cards" key={forecast.date}>
          <h4>{index === 0 ? t("weatherAPI.today") : forecast.date}</h4>
          <div>
            <img src={forecast.icon} alt="" />
            <div className="another-weather-cards-text">
              <p>
                {t("weatherAPI.min")} {forecast.minC}°C
              </p>
              <p>
                {t("weatherAPI.max")} {forecast.maxC}°C
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
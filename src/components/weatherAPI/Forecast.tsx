import { useTranslation } from "react-i18next";
import IForecast from "../../utils/interfaces/IForecast";
import "./WeatherApi.css";
type props = {
  forecasts: IForecast[];
};

const Forecast = (prop: props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [t] = useTranslation("global");
  return (
    <div className="another-weather">
      <div className="forecast-weather">
        {prop.forecasts.map((forecast) => {
          return (
            <div className="another-weather-cards" key={forecast.date}>
              <p>{forecast.date}</p>
              <div className="another-weather-card-img">
                <img src={forecast.icon} alt="icon"></img>
              </div>
              <p>
                {t("weatherAPI.min")} {forecast.minC}°C
              </p>
              <p>
                {t("weatherAPI.max")} {forecast.maxC}°C
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;

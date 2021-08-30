import { useTranslation } from "react-i18next";
import ICurrentWeather from "../../utils/interfaces/ICurrentWeather";
import "./WeatherApi.css";

type props = {
  currentWeather: ICurrentWeather;
};

const Current = (prop: props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [t] = useTranslation("global");

  return (
    <div className="current-weather">
      <div className="current-image">
        <p>{prop.currentWeather.cityCountry}</p>
        <img src={prop.currentWeather.icon} alt="casa"></img>
        <p>{prop.currentWeather.condition}</p>
      </div>
      <div className="current-weather-info">
        <p className="title">{prop.currentWeather.celsius}°C</p>
        <div className="another-info">
          <p>{prop.currentWeather.dt}</p>
          <p>
            {t("weatherAPI.humidity")}
            {prop.currentWeather.humidity}%
          </p>
          <p>
            {t("weatherAPI.wind")}
            {prop.currentWeather.wind}
            {t("weatherAPI.windMetric")} -{prop.currentWeather.windDir}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Current;

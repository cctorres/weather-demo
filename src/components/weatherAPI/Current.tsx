import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTint, faWind, faClock } from "@fortawesome/free-solid-svg-icons";
import ICurrentWeather from "../../utils/interfaces/ICurrentWeather";
import ICurrentHours from "../../utils/interfaces/ICurrentHours";
import "./Current.css";

type Props = {
  currentWeather: ICurrentWeather;
  currentHours: ICurrentHours;
};

const Current: React.FC<Props> = (props) => {
  const [t] = useTranslation("global");

  const temperature = Math.floor(props.currentWeather.celsius);
  const morning = Math.floor(props.currentHours.morning);
  const afternoon = Math.floor(props.currentHours.afternoon);
  const night = Math.floor(props.currentHours.night);

  return (
    <div className="current-weather-container">
      <h4>{props.currentWeather.city}</h4>
      <h4>{props.currentWeather.country}</h4>
      <div className="current-weather-info">
        <div className="current-weather">
          <p className="title">{temperature}°C</p>
          <img src={props.currentWeather.icon} alt=""></img>
          <p>{props.currentWeather.condition}</p>
        </div>
        <div className="current-weather-details">
          <h5>
            <FontAwesomeIcon icon={faTint} /> {t("weatherAPI.humidity")}
          </h5>
          <p>{props.currentWeather.humidity}%</p>
          <h5>
            <FontAwesomeIcon icon={faWind} /> {t("weatherAPI.wind")}
          </h5>
          <p>{props.currentWeather.wind} {t("weatherAPI.windMetric")} {props.currentWeather.windDir}</p>
        </div>
        <div className="day-hours">
          <h5>
            <FontAwesomeIcon icon={faClock} /> 06:00
          </h5>
          <p>{t("weatherAPI.temperature")} {morning}°C</p>
          <h5>
            <FontAwesomeIcon icon={faClock} /> 12:00
          </h5>
          <p>{t("weatherAPI.temperature")} {afternoon}°C</p>
          <h5>
            <FontAwesomeIcon icon={faClock} /> 18:00
          </h5>
          <p>{t("weatherAPI.temperature")} {night}°C</p>
        </div>
      </div>
    </div>
  );
};

export default Current;

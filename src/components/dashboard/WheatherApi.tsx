import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./WeatherApi.css";

type dataArgs = {
  city: String;
};

interface ICurrentWeather {
  cityCountry: string;
  icon: string;
  dt: string;
  celsius: string;
  humidity: string;
  wind: string;
  windDir: string;
  condition: string;
}

interface IForecast {
  date: string;
  icon: string;
  maxC: string;
  minC: string;
}

const WheatherApi = (arg: dataArgs) => {
  const [t, i18n] = useTranslation("global");
  const [currentWeather, setCurrentWeather] = useState<ICurrentWeather>({
    cityCountry: "",
    icon: "",
    dt: "",
    celsius: "",
    humidity: "",
    wind: "",
    windDir: "",
    condition: "",
  });

  const [forecast0, setForecast0] = useState<IForecast>({
    date: "",
    icon: "",
    maxC: "",
    minC: "",
  });

  const [forecast1, setForecast1] = useState<IForecast>({
    date: "",
    icon: "",
    maxC: "",
    minC: "",
  });

  const [forecast2, setForecast2] = useState<IForecast>({
    date: "",
    icon: "",
    maxC: "",
    minC: "",
  });

  const fetchAPI = async () => {
    var language = "";
    language = localStorage.getItem("language") || "en";
    const url =
      "https://api.weatherapi.com/v1/forecast.json?key="+process.env.REACT_APP_WEATHER_API+"&q=" +
      arg.city +
      "&days=5&aqi=yes&alerts=yes&lang=" +
      language;
    const response = await fetch(url);
    const responseJSON = await response.json();
    let currentWeather = {
      cityCountry:
        responseJSON.location.name + "," + responseJSON.location.country,
      icon: responseJSON.current.condition.icon,
      dt: responseJSON.location.localtime,
      celsius: responseJSON.current.temp_c,
      humidity: responseJSON.current.humidity,
      wind: responseJSON.current.wind_kph,
      windDir: responseJSON.current.wind_dir,
      condition: responseJSON.current.condition.text,
    };

    let forecast0 = {
      date: responseJSON.forecast.forecastday[0].date,
      icon: responseJSON.forecast.forecastday[0].day.condition.icon,
      maxC: responseJSON.forecast.forecastday[0].day.maxtemp_c,
      minC: responseJSON.forecast.forecastday[0].day.mintemp_c,
    };

    let forecast1 = {
      date: responseJSON.forecast.forecastday[1].date,
      icon: responseJSON.forecast.forecastday[1].day.condition.icon,
      maxC: responseJSON.forecast.forecastday[1].day.maxtemp_c,
      minC: responseJSON.forecast.forecastday[1].day.mintemp_c,
    };
    let forecast2 = {
      date: responseJSON.forecast.forecastday[2].date,
      icon: responseJSON.forecast.forecastday[2].day.condition.icon,
      maxC: responseJSON.forecast.forecastday[2].day.maxtemp_c,
      minC: responseJSON.forecast.forecastday[2].day.mintemp_c,
    };
    setForecast0(forecast0);
    setForecast1(forecast1);
    setForecast2(forecast2);
    setCurrentWeather(currentWeather);
  };
  useEffect(() => {
    fetchAPI();
  }, [arg.city, currentWeather.icon]);

  if (currentWeather.icon.length > 1) {
    return (
      <>
        <div className="weather-api-container">
          <div className="current-weather">
            <div className="current-image">
              <p>{currentWeather.cityCountry}</p>
              <img src={currentWeather.icon} alt="casa"></img>
            </div>
            <div className="current-weather-info">
              <p>{currentWeather.condition}</p>
              <p className="title">{currentWeather.celsius}°C</p>
              <div className="another-info">
                <p>{currentWeather.dt}</p>
                <p>
                  {t("weatherAPI.humidity")}
                  {currentWeather.humidity}
                  {t("weatherAPI.porcent-symbol")}
                </p>
                <p>
                  {t("weatherAPI.wind")}
                  {currentWeather.wind}
                  {t("weatherAPI.windMetric")} -{currentWeather.windDir}
                </p>
              </div>
            </div>
          </div>
          <div className="another-weather">
            <div className="forecast-weather">
              <div className="another-weather-cards">
                <p>{forecast0.date}</p>
                <div className="another-weather-card-img">
                  <img src={forecast0.icon} alt="icon"></img>
                </div>
                <p>
                  {forecast0.minC}°C - {forecast0.maxC}°C
                </p>
              </div>
              <div className="another-weather-cards">
                <p>{forecast1.date}</p>
                <div className="another-weather-card-img">
                  <img src={forecast1.icon} alt="icon"></img>
                </div>
                <p>
                  {forecast1.minC}°C - {forecast1.maxC}°C
                </p>
              </div>
              <div className="another-weather-cards">
                <p>{forecast2.date}</p>
                <div className="another-weather-card-img">
                  <img src={forecast2.icon} alt="icon"></img>
                </div>
                <p>
                  {forecast2.minC}°C - {forecast2.maxC}°C
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <div className="lds-dual-ring"></div>;
  }
};

export default WheatherApi;

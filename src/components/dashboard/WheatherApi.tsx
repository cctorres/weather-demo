import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ICurrentWeather from "../../interfaces/ICurrentWeather";
import IForecast from "../../interfaces/IForecast";
import "./WeatherApi.css";

type props = {
  city: String;
};

const WheatherApi = (prop: props) => {
  const [t] = useTranslation("global");
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

  const [forecasts, setForecasts] = useState<IForecast[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchAPI = async () => {
    let language = "";
    language = localStorage.getItem("language") || "en";
    const url =
      "https://api.weatherapi.com/v1/forecast.json?key=" +
      process.env.REACT_APP_WEATHER_API +
      "&q=" +
      prop.city +
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

    let forecast: IForecast[] = responseJSON.forecast.forecastday.map((currentForecast: any) => ({
      date: currentForecast.date,
      icon: currentForecast.day.condition.icon,
      maxC: currentForecast.day.maxtemp_c,
      minC: currentForecast.day.mintemp_c,
    }));

    setForecasts(forecast);
    setCurrentWeather(currentWeather);
  };
  useEffect(() => {
    fetchAPI();
  }, [fetchAPI, prop.city]);

  if (currentWeather.icon.length > 1) {
    return (
      <>
        <div className="weather-api-container">
          <div className="current-weather">
            <div className="current-image">
              <p>{currentWeather.cityCountry}</p>
              <img src={currentWeather.icon} alt="casa"></img>
              <p>{currentWeather.condition}</p>
            </div>
            <div className="current-weather-info">
              <p className="title">{currentWeather.celsius}°C</p>
              <div className="another-info">
                <p>{currentWeather.dt}</p>
                <p>
                  {t("weatherAPI.humidity")}
                  {currentWeather.humidity}%
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
              {forecasts.map((forecast) => {
                return (
                  <div className="another-weather-cards">
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
        </div>
      </>
    );
  } else {
    return <div className="spinner"></div>;
  }
};

export default WheatherApi;

import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import ICurrentWeather from "../../utils/interfaces/ICurrentWeather";
import IForecast from "../../utils/interfaces/IForecast";
import ICurrentHours from "../../utils/interfaces/ICurrentHours";
import Forecast from "./Forecast";
import Current from "./Current";
import notFound from '../../utils/assets/images/not-found.png';
import "./WeatherApi.css";

type Props = {
  city: string;
};

const WeatherApi = ({ city }: Props) => {
  const [t] = useTranslation("global");
  const [error, setError] = useState<boolean>(false);
  const [forecasts, setForecasts] = useState<IForecast[]>([]);

  const [currentWeather, setCurrentWeather] = useState<ICurrentWeather>({
    city: "",
    country: "",
    icon: "",
    dt: "",
    celsius: 0,
    humidity: 0,
    wind: 0,
    windDir: "",
    condition: "",
  });

  const [currentHours, setCurrentHours] = useState<ICurrentHours>({
    morning: 0,
    afternoon: 0,
    night: 0,
  });

  const fetchWeatherData = useCallback(async () => {
    let language = localStorage.getItem("language") || "en";
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API}&q=${city}&days=5&aqi=yes&alerts=yes&lang=${language}`;
    const response = await fetch(url);

    const responseJSON = await response.json();
    if (responseJSON.error) {
      setError(true);
    } else {
      let currentWeatherData = {
        city: responseJSON.location.name,
        country: responseJSON.location.country,
        icon: responseJSON.current.condition.icon,
        dt: responseJSON.location.localtime,
        celsius: responseJSON.current.temp_c,
        humidity: responseJSON.current.humidity,
        wind: responseJSON.current.wind_kph,
        windDir: responseJSON.current.wind_dir,
        condition: responseJSON.current.condition.text,
      };

      let forecastData: IForecast[] = responseJSON.forecast.forecastday.map(
        (currentForecast: any) => ({
          date: currentForecast.date,
          icon: currentForecast.day.condition.icon,
          maxC: currentForecast.day.maxtemp_c,
          minC: currentForecast.day.mintemp_c,
        })
      );

      let currentHoursData = {
        morning: responseJSON.forecast.forecastday[0].hour[5].temp_c,
        afternoon: responseJSON.forecast.forecastday[0].hour[11].temp_c,
        night: responseJSON.forecast.forecastday[0].hour[17].temp_c,
      };

      setCurrentWeather(currentWeatherData);
      setForecasts(forecastData);
      setCurrentHours(currentHoursData);
    }
  }, [city]);

  useEffect(() => {
    fetchWeatherData();
    console.log(currentWeather);
  }, [city, fetchWeatherData]);

  if (error) {
    return (
      <div className="city-not-found">
        <img src={notFound} alt="" />
        <strong>
          <p>{t("weatherAPI.cityError")} <a href="https://www.iso.org/obp/ui/#search" target="_blank" rel="noopener noreferrer">ISO 3166</a>.</p>
        </strong>
      </div>
    );
  } else {
    return currentWeather.icon.length > 1 ? (
      <div className="weather-api-container">
        <Current currentWeather={currentWeather} currentHours={currentHours} />
        <Forecast forecasts={forecasts} />
      </div>
    ) : (
      <div className="spinner"></div>
    );
  }
};

export default WeatherApi;
import { useEffect, useState } from "react";
import ICurrentWeather from "../../utils/interfaces/ICurrentWeather";
import IForecast from "../../utils/interfaces/IForecast";
import Forecast from "./Forecast";
import Current from "./Current";
import "./WeatherApi.css";

type props = {
  city: String;
};

const WheatherApi = (prop: props) => {
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

    let forecast: IForecast[] = responseJSON.forecast.forecastday.map(
      (currentForecast: any) => ({
        date: currentForecast.date,
        icon: currentForecast.day.condition.icon,
        maxC: currentForecast.day.maxtemp_c,
        minC: currentForecast.day.mintemp_c,
      })
    );

    setForecasts(forecast);
    setCurrentWeather(currentWeather);
  };
  useEffect(() => {
    fetchAPI();
  }, [prop.city]);

  if (currentWeather.icon.length > 1) {
    return (
      <>
        <div className="weather-api-container">
          <Current currentWeather={currentWeather} />
          <Forecast forecasts={forecasts} />
        </div>
      </>
    );
  } else {
    return <div className="spinner"></div>;
  }
};

export default WheatherApi;

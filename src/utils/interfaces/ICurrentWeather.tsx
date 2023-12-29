export default interface ICurrentWeather {
  city: string;
  country: string
  icon: string;
  dt: string;
  celsius: number;
  humidity: number;
  wind: number;
  windDir: string;
  condition: string;
}

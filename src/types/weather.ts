export type WeatherBundle = {
  meta: {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    timezone: string;
  };
  current: {
    temperature: number;
    relative_humidity: number;
    wind_speed: number;
    weathercode: number;
    weathercode_text: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    wind_speed_10m: number[];
    weather_code: number[];
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    wind_speed_10m_max: number[];
    weather_code: number[];
  };
};

import { WeatherBundle } from "@app-types/weather";
import { cacheBundle } from "@utils/cache";
import { codeToText } from "@utils/weatherCodes";

const BASE = "https://api.open-meteo.com/v1/forecast";

export async function fetchByCoords(
  latitude: number,
  longitude: number,
  name = "Location",
  timezone?: string,
  id = "current-location"
): Promise<WeatherBundle> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    hourly: "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code",
    daily: "temperature_2m_max,temperature_2m_min,wind_speed_10m_max,weather_code",
    current:
      "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code",
    timezone: timezone || "auto"
  });

  const res = await fetch(`${BASE}?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch weather");

  const j = await res.json();

  const bundle: WeatherBundle = {
    meta: {
      id,
      name,
      latitude: j.latitude,
      longitude: j.longitude,
      timezone: j.timezone
    },
    current: {
      temperature: j.current.temperature_2m,
      relative_humidity: j.current.relative_humidity_2m,
      wind_speed: j.current.wind_speed_10m,
      weathercode: j.current.weather_code,
      weathercode_text: codeToText(j.current.weather_code)
    },
    hourly: {
      time: j.hourly.time,
      temperature_2m: j.hourly.temperature_2m,
      relative_humidity_2m: j.hourly.relative_humidity_2m,
      wind_speed_10m: j.hourly.wind_speed_10m,
      weather_code: j.hourly.weather_code
    },
    daily: {
      time: j.daily.time,
      temperature_2m_max: j.daily.temperature_2m_max,
      temperature_2m_min: j.daily.temperature_2m_min,
      wind_speed_10m_max: j.daily.wind_speed_10m_max,
      weather_code: j.daily.weather_code
    }
  };

  cacheBundle(id, bundle);
  return bundle;
}


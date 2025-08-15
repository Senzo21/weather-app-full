import { WeatherBundle } from "@types/weather";
import { formatHour, formatDayLabel } from "@utils/formatDate";
import { toDisplayTemp } from "@utils/convertUnits";
import { useUnit } from "@hooks/useWeatherUnit";

type Props = {
  data: WeatherBundle;
  mode: "hourly" | "daily";
};

export default function WeatherCard({ data, mode }: Props) {
  const { unit } = useUnit();
  const current = data.current;
  const hourly = data.hourly;
  const daily = data.daily;

  return (
    <div className="card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">{data.meta.name}</h3>
          <p className="text-sm opacity-80">
            {data.meta.latitude.toFixed(3)}, {data.meta.longitude.toFixed(3)} · {current.weathercode_text}
          </p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold">
            {toDisplayTemp(current.temperature, unit)}°
          </div>
          <div className="text-sm opacity-80">
            Humidity {current.relative_humidity}% · Wind {current.wind_speed} m/s
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {mode === "hourly" &&
          hourly.time.slice(0, 12).map((t, i) => (
            <div key={t} className="card p-3">
              <div className="text-sm opacity-80">{formatHour(t, data.meta.timezone)}</div>
              <div className="text-2xl font-semibold">
                {toDisplayTemp(hourly.temperature_2m[i], unit)}°
              </div>
              <div className="text-sm">Wind {hourly.wind_speed_10m[i]} m/s</div>
            </div>
          ))}

        {mode === "daily" &&
          daily.time.slice(0, 7).map((t, i) => (
            <div key={t} className="card p-3">
              <div className="text-sm opacity-80">{formatDayLabel(t, data.meta.timezone)}</div>
              <div className="text-lg">
                <span className="font-semibold">
                  {toDisplayTemp(daily.temperature_2m_max[i], unit)}°
                </span>{" "}
                / {toDisplayTemp(daily.temperature_2m_min[i], unit)}°
              </div>
              <div className="text-sm">Wind {daily.wind_speed_10m_max[i]} m/s</div>
            </div>
          ))}
      </div>
    </div>
  );
}

import { WeatherBundle } from "@types/weather";

const KEY = "weather-cache";

type CacheMap = Record<string, WeatherBundle>;

function read(): CacheMap {
  const raw = localStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as CacheMap) : {};
}

function write(map: CacheMap) {
  localStorage.setItem(KEY, JSON.stringify(map));
}

export function cacheBundle(id: string, bundle: WeatherBundle) {
  const map = read();
  map[id] = { ...bundle, meta: { ...bundle.meta, id } };
  write(map);
}

export function getCachedBundle(id: string): WeatherBundle | null {
  const map = read();
  return map[id] || null;
}

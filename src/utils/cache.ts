import { WeatherBundle } from "@app-types/weather";

const KEY = "weather-cache";

type CacheMap = Record<string, WeatherBundle>;

function read(): CacheMap {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CacheMap) : {};
  } catch {
    return {};
  }
}

function write(map: CacheMap) {
  try {
    localStorage.setItem(KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
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


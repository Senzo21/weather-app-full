import SearchBar from "@components/SearchBar";
import { searchPlaces } from "@services/locationService";
import { useState } from "react";
import { useSaved } from "@hooks/useSavedLocations";
import { WeatherBundle } from "@app-types/weather";
import { fetchByCoords } from "@services/weatherService";
import WeatherCard from "@components/WeatherCard";
import { useOnlineStatus } from "@hooks/useOnlineStatus";
import { getCachedBundle } from "@utils/cache";

export default function Search() {
  const [results, setResults] = useState<Array<{name:string, latitude:number, longitude:number, timezone:string, id:string}>>([]);
  const [selected, setSelected] = useState<WeatherBundle | null>(null);
  const [mode, setMode] = useState<"hourly" | "daily">("hourly");
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { add } = useSaved();
  const online = useOnlineStatus();

  async function onSearch(q: string) {
    if (!online) {
      setStatus("Offline. Connect to the internet to search.");
      return;
    }
    setLoading(true);
    setStatus("");
    try {
      const res = await searchPlaces(q);
      setResults(res);
    } catch {
      setStatus("Failed to search places. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function openResult(r: any) {
    if (!online) {
      const cached = getCachedBundle(r.id);
      if (cached) setSelected(cached);
      setStatus("Offline. Showing cached data if available.");
      return;
    }
    setLoading(true);
    setStatus("");
    try {
      const b = await fetchByCoords(r.latitude, r.longitude, r.name, r.timezone, r.id);
      setSelected(b);
    } catch {
      const cached = getCachedBundle(r.id);
      if (cached) setSelected(cached);
      setStatus("Failed to fetch live weather. Showing cached data if available.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Search locations</h1>
      <SearchBar onSearch={onSearch} disabled={!online} />

      {!online && <p className="opacity-80">Offline. Search is unavailable.</p>}
      {status && <p className="opacity-80">{status}</p>}
      {loading && <p>Loading...</p>}

      <div className="grid md:grid-cols-2 gap-3">
        {results.map((r) => (
          <div key={r.id} className="card flex items-center justify-between">
            <div>
              <div className="font-semibold">{r.name}</div>
              <div className="text-sm opacity-80">
                {r.latitude.toFixed(3)}, {r.longitude.toFixed(3)} - TZ: {r.timezone}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn" onClick={() => openResult(r)}>Open</button>
              <button className="btn" onClick={() => add({
                id: r.id,
                name: r.name,
                latitude: r.latitude,
                longitude: r.longitude,
                timezone: r.timezone
              })}>
                Save
              </button>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Preview</h2>
            <div className="flex gap-2">
              <button className={`btn ${mode === "hourly" ? "bg-slate-100 dark:bg-slate-800" : ""}`} onClick={() => setMode("hourly")}>Hourly</button>
              <button className={`btn ${mode === "daily" ? "bg-slate-100 dark:bg-slate-800" : ""}`} onClick={() => setMode("daily")}>Daily</button>
            </div>
          </div>
          <WeatherCard data={selected} mode={mode} />
        </div>
      )}
    </div>
  );
}


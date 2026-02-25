import { useParams } from "react-router-dom";
import { useSaved } from "@hooks/useSavedLocations";
import { fetchByCoords } from "@services/weatherService";
import { useEffect, useState } from "react";
import WeatherCard from "@components/WeatherCard";
import { WeatherBundle } from "@app-types/weather";
import { getCachedBundle } from "@utils/cache";
import { useOnlineStatus } from "@hooks/useOnlineStatus";

export default function LocationDetails() {
  const { id } = useParams();
  const { saved } = useSaved();
  const [bundle, setBundle] = useState<WeatherBundle | null>(null);
  const [mode, setMode] = useState<"hourly" | "daily">("hourly");
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const online = useOnlineStatus();

  useEffect(() => {
    if (!id) return;
    const cached = getCachedBundle(id);
    if (cached) setBundle(cached);

    const loc = saved.find((x) => x.id === id);
    if (!loc) {
      setStatus("Saved location not found.");
      setLoading(false);
      return;
    }

    if (!online) {
      setStatus("Offline. Showing cached data if available.");
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchByCoords(loc.latitude, loc.longitude, loc.name, loc.timezone, loc.id)
      .then((data) => {
        setBundle(data);
        setStatus("");
      })
      .catch(() => {
        setStatus("Failed to fetch live weather. Showing cached data if available.");
      })
      .finally(() => setLoading(false));
  }, [id, saved, online]);

  if (!id) return <p>Missing id.</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Location details</h1>
        <div className="flex gap-2">
          <button className={`btn ${mode === "hourly" ? "bg-slate-100 dark:bg-slate-800" : ""}`} onClick={() => setMode("hourly")}>Hourly</button>
          <button className={`btn ${mode === "daily" ? "bg-slate-100 dark:bg-slate-800" : ""}`} onClick={() => setMode("daily")}>Daily</button>
        </div>
      </div>
      {!online && <p className="opacity-80">Offline. Showing cached data if available.</p>}
      {status && <p className="opacity-80">{status}</p>}
      {loading && <p>Loading...</p>}
      {bundle ? <WeatherCard data={bundle} mode={mode} /> : !loading && !status && <p>No data available.</p>}
    </div>
  );
}


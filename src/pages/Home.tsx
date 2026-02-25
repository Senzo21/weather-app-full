import { useEffect, useState } from "react";
import WeatherCard from "@components/WeatherCard";
import { fetchByCoords } from "@services/weatherService";
import { useSaved } from "@hooks/useSavedLocations";
import { WeatherBundle } from "@app-types/weather";
import LocationList from "@components/LocationList";
import { getCachedBundle } from "@utils/cache";
import { maybeNotifySevere } from "@utils/notifications";
import { useOnlineStatus } from "@hooks/useOnlineStatus";

export default function Home() {
  const { saved, remove } = useSaved();
  const [bundle, setBundle] = useState<WeatherBundle | null>(null);
  const [mode, setMode] = useState<"hourly" | "daily">("hourly");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>("");
  const online = useOnlineStatus();

  useEffect(() => {
    const cached = getCachedBundle("current-location");
    if (cached) setBundle(cached);

    if (!navigator.geolocation) {
      setStatus("Geolocation not supported. Showing last cached data if available.");
      return;
    }

    if (!online) {
      setStatus("Offline. Showing cached data if available.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const data = await fetchByCoords(pos.coords.latitude, pos.coords.longitude, "Current Location");
          setBundle(data);
          maybeNotifySevere(data);
          setStatus("");
        } catch {
          setStatus("Failed to fetch live weather. Showing cached data if available.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setStatus("Location permission denied. Showing cached data if available.");
        setLoading(false);
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  }, [online]);

  return (
    <div className="space-y-6">
      <section className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Current location weather</h1>
        <div className="flex gap-2">
          <button className={`btn ${mode === "hourly" ? "bg-slate-100 dark:bg-slate-800" : ""}`} onClick={() => setMode("hourly")}>Hourly</button>
          <button className={`btn ${mode === "daily" ? "bg-slate-100 dark:bg-slate-800" : ""}`} onClick={() => setMode("daily")}>Daily</button>
        </div>
      </section>

      {!online && <p className="opacity-80">Offline. Showing cached data if available.</p>}
      {status && <p className="opacity-80">{status}</p>}
      {loading && <p>Loading...</p>}
      {bundle && <WeatherCard data={bundle} mode={mode} />}

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Saved locations</h2>
        <LocationList items={saved} onRemove={remove} />
      </section>
    </div>
  );
}


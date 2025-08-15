import { useParams } from "react-router-dom";
import { useSaved } from "@hooks/useSavedLocations";
import { fetchByCoords } from "@services/weatherService";
import { useEffect, useState } from "react";
import WeatherCard from "@components/WeatherCard";
import { WeatherBundle } from "@types/weather";

export default function LocationDetails() {
  const { id } = useParams();
  const { find } = useSaved();
  const [bundle, setBundle] = useState<WeatherBundle | null>(null);
  const [mode, setMode] = useState<"hourly" | "daily">("hourly");

  useEffect(() => {
    const loc = find(id!);
    if (!loc) return;
    fetchByCoords(loc.latitude, loc.longitude, loc.name, loc.timezone, loc.id).then(setBundle);
  }, [id]);

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
      {bundle ? <WeatherCard data={bundle} mode={mode} /> : <p>Loading…</p>}
    </div>
  );
}

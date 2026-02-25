import { useTheme } from "@hooks/useTheme";
import { useUnit } from "@hooks/useWeatherUnit";
import { useSaved } from "@hooks/useSavedLocations";
import LocationList from "@components/LocationList";

export default function Settings() {
  const { theme, toggle: toggleTheme } = useTheme();
  const { unit, toggle: toggleUnit } = useUnit();
  const { saved, remove } = useSaved();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="card space-y-2">
        <h2 className="font-semibold">Theme</h2>
        <p className="opacity-80">Current: {theme}</p>
        <button className="btn" onClick={toggleTheme}>Toggle Theme</button>
      </div>

      <div className="card space-y-2">
        <h2 className="font-semibold">Units</h2>
        <p className="opacity-80">Temperature unit: {unit === "c" ? "Celsius (C)" : "Fahrenheit (F)"}</p>
        <button className="btn" onClick={toggleUnit}>Toggle Units</button>
      </div>

      <div className="space-y-3">
        <h2 className="font-semibold">Manage saved locations</h2>
        <LocationList items={saved} onRemove={remove} />
      </div>
    </div>
  );
}

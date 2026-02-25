import { useUnit } from "@hooks/useWeatherUnit";

export default function UnitToggle() {
  const { unit, toggle } = useUnit();
  return (
    <button className="btn text-sm" onClick={toggle} aria-label="Toggle units">
      {unit === "c" ? "C" : "F"}
    </button>
  );
}

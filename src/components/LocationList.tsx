import { SavedLocation } from "@app-types/location";
import { Link } from "react-router-dom";

type Props = {
  items: SavedLocation[];
  onRemove?: (id: string) => void;
};

export default function LocationList({ items, onRemove }: Props) {
  if (!items.length) return <p className="opacity-70">No saved locations yet.</p>;
  return (
    <ul className="grid md:grid-cols-2 gap-3">
      {items.map((loc) => (
        <li key={loc.id} className="card flex items-center justify-between">
          <div>
            <div className="font-semibold">{loc.name}</div>
            <div className="text-sm opacity-80">
              {loc.latitude.toFixed(3)}, {loc.longitude.toFixed(3)} - TZ: {loc.timezone}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link className="btn" to={`/location/${encodeURIComponent(loc.id)}`}>Open</Link>
            {onRemove && (
              <button className="btn" onClick={() => onRemove(loc.id)}>
                Remove
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}


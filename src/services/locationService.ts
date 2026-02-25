import { SavedLocation } from "@app-types/location";

const GEOCODE = "https://geocoding-api.open-meteo.com/v1/search";

export async function searchPlaces(q: string): Promise<SavedLocation[]> {
  const params = new URLSearchParams({
    name: q,
    count: "10",
    language: "en",
    format: "json"
  });
  const res = await fetch(`${GEOCODE}?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to search places");
  const j = await res.json();
  const items: SavedLocation[] =
    (j.results || []).map((r: any) => ({
      id: `${r.id}`,
      name: `${r.name}${r.admin1 ? ", " + r.admin1 : ""}${r.country ? ", " + r.country : ""}`,
      latitude: r.latitude,
      longitude: r.longitude,
      timezone: r.timezone || "auto"
    })) ?? [];
  return items;
}


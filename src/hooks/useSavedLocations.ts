import { useLocalStorage } from "./useLocalStorage";
import { SavedLocation } from "@app-types/location";

export function useSaved() {
  const [saved, setSaved] = useLocalStorage<SavedLocation[]>("saved-locations", []);

  function add(loc: SavedLocation) {
    setSaved((prev) => {
      if (prev.find((x) => x.id === loc.id)) return prev;
      return [loc, ...prev];
    });
  }

  function remove(id: string) {
    setSaved((prev) => prev.filter((x) => x.id !== id));
  }

  function find(id: string) {
    return saved.find((x) => x.id === id);
  }

  return { saved, add, remove, find };
}


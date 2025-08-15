import { useLocalStorage } from "./useLocalStorage";

export function useUnit() {
  const [unit, setUnit] = useLocalStorage<"c" | "f">("unit", "c");
  function toggle() { setUnit(unit === "c" ? "f" : "c"); }
  return { unit, toggle };
}

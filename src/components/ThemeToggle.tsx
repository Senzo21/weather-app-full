import { useTheme } from "@hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button className="btn text-sm" onClick={toggle} aria-label="Toggle theme">
      {theme === "dark" ? "Dark" : "Light"}
    </button>
  );
}

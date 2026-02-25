import { NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import UnitToggle from "./UnitToggle";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800">
      <div className="container py-3 flex items-center gap-3">
        <button
          onClick={() => navigate("/")}
          className="font-bold text-lg tracking-tight"
          aria-label="Home"
        >
          React Weather
        </button>

        <nav className="ml-auto flex items-center gap-2">
          <NavLink className="btn text-sm" to="/">Home</NavLink>
          <NavLink className="btn text-sm" to="/search">Search</NavLink>
          <NavLink className="btn text-sm" to="/settings">Settings</NavLink>
          <UnitToggle />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

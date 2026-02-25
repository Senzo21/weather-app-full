export default function Footer() {
  return (
    <footer className="mt-8 border-t border-slate-200 dark:border-slate-800">
      <div className="container py-6 text-sm opacity-80 flex flex-wrap gap-2 justify-between">
        <p>Built with React + TS + Vite + Tailwind - Open-Meteo APIs</p>
        <p>&copy; {new Date().getFullYear()} Weather App</p>
      </div>
    </footer>
  );
}

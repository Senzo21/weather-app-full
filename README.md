# Weather App (React + TypeScript + Vite + TailwindCSS)

Modern, responsive weather app using Open-Meteo APIs. It supports current conditions, hourly/daily views, saved locations, unit/theme preferences, offline cache, and optional weather alerts.

## Features
- Current weather and forecasts (hourly and daily).
- Location detection and location search.
- Saved locations list.
- Theme and unit toggles.
- Offline fallback using cached data.
- Optional browser notifications for severe conditions.

## Setup
```bash
npm install
npm run dev
```

## Scripts
- `npm run dev` Start the dev server.
- `npm run build` Build for production.
- `npm run preview` Preview the production build.

## Project Structure
```
weather-app-full/
  src/
    components/
    hooks/
    pages/
    services/
    types/
    utils/
    App.tsx
    main.tsx
    index.css
  package.json
  tailwind.config.js
  tsconfig.json
  README.md
```

## APIs
- Weather data: Open-Meteo
- Geocoding: Open-Meteo

## License
Open source.

## Author
Senzo21

# 🌦️ Weather App (React + TypeScript + Vite + TailwindCSS)

A modern, responsive weather application built with **React**, **TypeScript**, **Vite**, and **TailwindCSS**, using the free **[Open-Meteo API](https://open-meteo.com/)**.  
It allows users to see the current weather for their location or any searched location, with features like unit and theme switching, offline caching, and weather alerts.

---

## 🚀 Features

- **Current Weather** – Temperature, humidity, wind speed, and condition icons.
- **Hourly & Daily Forecast** – View weather by hour or day.
- **Location Detection** – Automatically fetch weather for your current location.
- **Search Locations** – Search by city or place name.
- **Save Locations** – Quickly revisit your favorite places.
- **Theme Toggle** – Switch between Light 🌞 and Dark 🌙 modes.
- **Unit Toggle** – Switch between Celsius (°C) and Fahrenheit (°F).
- **Offline Access** – Cached weather data for previously loaded locations.
- **Weather Alerts** – Optional browser notifications for extreme weather.

---

## 🛠️ Tech Stack

- **React 18** with **TypeScript**
- **Vite** for fast development
- **TailwindCSS** for styling
- **React Router v6** for navigation
- **Open-Meteo API** for weather & geocoding
- **LocalStorage** for data persistence

---

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Senzo21/weather-app-full.git
   cd weather-app-full

2. **Install dependencies**

   npm install


3. **Start development server**

    npm run dev
    Then open the printed URL.
   

4. **Build for production**

    npm run build


5. **Preview production build**

    npm run preview
   

📂 **Project Structure**
weather-app-full/
├── public/              # Public assets
├── src/
│   ├── components/      # UI components (Navbar, Footer, WeatherCard, etc.)
│   ├── hooks/           # Custom hooks for theme, units, saved locations
│   ├── pages/           # App pages (Home, Search, Settings, etc.)
│   ├── services/        # API service functions
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── App.tsx          # App entry point
│   ├── main.tsx         # React DOM rendering
│   └── index.css        # Global styles
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md

🌐 **API Reference**

   Weather Data: https://open-meteo.com/
   Geocoding API: https://open-meteo.com/en/docs/geocoding-api


📜 **License**

   This project is open source.

👨‍💻 **Author**

   Senzo21
📧 Email: luthernakumba2000@gmail.com

import { WeatherBundle } from "@app-types/weather";

export async function requestNotificationPermission() {
  if (!("Notification" in window)) return;
  if (Notification.permission === "default") {
    try {
      await Notification.requestPermission();
    } catch {
      // ignore
    }
  }
}

export function maybeNotifySevere(bundle?: WeatherBundle) {
  if (!("Notification" in window) || Notification.permission !== "granted") return;

  const b = bundle ?? (() => {
    try {
      const raw = localStorage.getItem("weather-cache");
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed["current-location"] as WeatherBundle;
    } catch {
      return null;
    }
  })();

  if (!b) return;

  const t = b.current.temperature;
  const wind = b.current.wind_speed;

  if (t <= -2 || t >= 38 || wind >= 20 || [95, 96, 99].includes(b.current.weathercode)) {
    const msg = `Severe weather near ${b.meta.name}: ` +
      `${t >= 38 ? "Extreme heat" : t <= -2 ? "Extreme cold" : ""} ` +
      `${wind >= 20 ? "- High wind" : ""}`;
    try {
      new Notification("Weather Alert", { body: msg.trim(), tag: "weather-alert" });
    } catch {
      // ignored
    }
  }
}


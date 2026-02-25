export function formatHour(iso: string, tz: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", timeZone: tz });
  } catch {
    return iso;
  }
}

export function formatDayLabel(iso: string, tz: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", timeZone: tz });
  } catch {
    return iso;
  }
}

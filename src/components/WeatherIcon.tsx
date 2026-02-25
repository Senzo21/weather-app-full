import type { SVGProps } from "react";

type Props = {
  code?: number;
  className?: string;
  title?: string;
};

type IconName = "sun" | "cloud" | "cloud-sun" | "fog" | "rain" | "snow" | "storm" | "drizzle";

function iconForCode(code: number): IconName {
  if (code === 0) return "sun";
  if (code === 1 || code === 2) return "cloud-sun";
  if (code === 3) return "cloud";
  if (code === 45 || code === 48) return "fog";
  if (code === 51 || code === 53 || code === 55) return "drizzle";
  if (code === 61 || code === 63 || code === 65 || code === 80 || code === 81 || code === 82) return "rain";
  if (code === 71 || code === 73 || code === 75) return "snow";
  if (code === 95 || code === 96 || code === 99) return "storm";
  return "cloud";
}

function colorForIcon(name: IconName): string {
  switch (name) {
    case "sun":
      return "#f59e0b";
    case "cloud-sun":
      return "#eab308";
    case "cloud":
      return "#94a3b8";
    case "fog":
      return "#a1a1aa";
    case "drizzle":
      return "#38bdf8";
    case "rain":
      return "#0ea5e9";
    case "snow":
      return "#e5e7eb";
    case "storm":
      return "#6366f1";
    default:
      return "#94a3b8";
  }
}

export default function WeatherIcon({ code, className, title }: Props) {
  const safeCode = Number.isFinite(code) ? (code as number) : 3;
  const name = iconForCode(safeCode);
  const color = colorForIcon(name);
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: { color }
  } satisfies SVGProps<SVGSVGElement>;

  if (name === "sun") {
    return (
      <svg {...common} className={className} aria-hidden={!title} role={title ? "img" : "presentation"}>
        {title ? <title>{title}</title> : null}
        <circle cx="12" cy="12" r="4" />
        <line x1="12" y1="2" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="2" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="22" y2="12" />
        <line x1="4.5" y1="4.5" x2="6.7" y2="6.7" />
        <line x1="17.3" y1="17.3" x2="19.5" y2="19.5" />
        <line x1="17.3" y1="6.7" x2="19.5" y2="4.5" />
        <line x1="4.5" y1="19.5" x2="6.7" y2="17.3" />
      </svg>
    );
  }

  if (name === "cloud") {
    return (
      <svg {...common} className={className} aria-hidden={!title} role={title ? "img" : "presentation"}>
        {title ? <title>{title}</title> : null}
        <path d="M6 18h10a4 4 0 0 0 0-8 6 6 0 0 0-11.2 2A3.5 3.5 0 0 0 6 18z" />
      </svg>
    );
  }

  if (name === "cloud-sun") {
    return (
      <svg {...common} className={className} aria-hidden={!title} role={title ? "img" : "presentation"}>
        {title ? <title>{title}</title> : null}
        <circle cx="7.5" cy="8" r="3" />
        <line x1="7.5" y1="2.5" x2="7.5" y2="4.5" />
        <line x1="3.5" y1="8" x2="5.5" y2="8" />
        <line x1="9.5" y1="8" x2="11.5" y2="8" />
        <path d="M8 18h8a3.5 3.5 0 0 0 0-7 5 5 0 0 0-9.2 1.8A3 3 0 0 0 8 18z" />
      </svg>
    );
  }

  if (name === "fog") {
    return (
      <svg {...common} className={className} aria-hidden={!title} role={title ? "img" : "presentation"}>
        {title ? <title>{title}</title> : null}
        <path d="M4 10h16" />
        <path d="M3 14h18" />
        <path d="M6 18h12" />
      </svg>
    );
  }

  if (name === "drizzle") {
    return (
      <svg {...common} className={className} aria-hidden={!title} role={title ? "img" : "presentation"}>
        {title ? <title>{title}</title> : null}
        <path d="M6 14h10a4 4 0 0 0 0-8 6 6 0 0 0-11.2 2A3.5 3.5 0 0 0 6 14z" />
        <line x1="8" y1="17" x2="8" y2="20" />
        <line x1="12" y1="17" x2="12" y2="20" />
        <line x1="16" y1="17" x2="16" y2="20" />
      </svg>
    );
  }

  if (name === "rain") {
    return (
      <svg {...common} className={className} aria-hidden={!title} role={title ? "img" : "presentation"}>
        {title ? <title>{title}</title> : null}
        <path d="M6 13h10a4 4 0 0 0 0-8 6 6 0 0 0-11.2 2A3.5 3.5 0 0 0 6 13z" />
        <line x1="8" y1="16" x2="7" y2="20" />
        <line x1="12" y1="16" x2="11" y2="20" />
        <line x1="16" y1="16" x2="15" y2="20" />
      </svg>
    );
  }

  if (name === "snow") {
    return (
      <svg {...common} className={className} aria-hidden={!title} role={title ? "img" : "presentation"}>
        {title ? <title>{title}</title> : null}
        <path d="M6 13h10a4 4 0 0 0 0-8 6 6 0 0 0-11.2 2A3.5 3.5 0 0 0 6 13z" />
        <path d="M9 17h0.01" />
        <path d="M12 19h0.01" />
        <path d="M15 17h0.01" />
      </svg>
    );
  }

  return (
    <svg {...common} className={className} aria-hidden={!title} role={title ? "img" : "presentation"}>
      {title ? <title>{title}</title> : null}
      <path d="M6 13h10a4 4 0 0 0 0-8 6 6 0 0 0-11.2 2A3.5 3.5 0 0 0 6 13z" />
      <path d="M12 13l-2 4h3l-2 5" />
    </svg>
  );
}

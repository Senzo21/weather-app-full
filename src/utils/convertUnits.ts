export function cToF(c: number) {
  return (c * 9) / 5 + 32;
}

export function toDisplayTemp(celsius: number, unit: "c" | "f") {
  return Math.round(unit === "c" ? celsius : cToF(celsius));
}

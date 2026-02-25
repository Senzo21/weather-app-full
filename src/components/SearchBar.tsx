import { useState } from "react";

type Props = { onSearch: (q: string) => void; disabled?: boolean };

export default function SearchBar({ onSearch, disabled }: Props) {
  const [q, setQ] = useState("");
  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (q.trim()) onSearch(q.trim());
      }}
    >
      <input
        className="input"
        placeholder="Search city or place..."
        value={q}
        disabled={disabled}
        onChange={(e) => setQ(e.target.value)}
      />
      <button className="btn" type="submit" disabled={disabled}>Search</button>
    </form>
  );
}

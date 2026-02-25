import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

function applyInitialTheme() {
  try {
    const raw = localStorage.getItem("theme");
    let theme: "light" | "dark" | null = null;
    if (raw) {
      const parsed = JSON.parse(raw) as "light" | "dark";
      theme = parsed === "dark" ? "dark" : "light";
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      theme = "dark";
    } else {
      theme = "light";
    }
    document.documentElement.classList.toggle("dark", theme === "dark");
  } catch {
    // ignore
  }
}

applyInitialTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

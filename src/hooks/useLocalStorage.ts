import { useEffect, useRef, useState } from "react";

const STORAGE_EVENT = "local-storage";

function safeRead<T>(key: string, initial: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : initial;
  } catch {
    return initial;
  }
}

function safeWrite<T>(key: string, val: T) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {
    // ignore write failures
  }
}

export function useLocalStorage<T>(key: string, initial: T) {
  const initialRef = useRef(initial);
  const [val, setVal] = useState<T>(() => safeRead(key, initialRef.current));

  useEffect(() => {
    safeWrite(key, val);
    try {
      window.dispatchEvent(new CustomEvent(STORAGE_EVENT, { detail: { key } }));
    } catch {
      // ignore event failures
    }
  }, [key, val]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) setVal(safeRead(key, initialRef.current));
    };
    const onCustom = (e: Event) => {
      const detail = (e as CustomEvent).detail as { key?: string } | undefined;
      if (detail?.key === key) setVal(safeRead(key, initialRef.current));
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener(STORAGE_EVENT, onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(STORAGE_EVENT, onCustom);
    };
  }, [key]);

  return [val, setVal] as const;
}

"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "juncal:favoritos";
const EMPTY: readonly string[] = [];

let current: readonly string[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    current = Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : EMPTY;
  } catch {
    current = EMPTY;
  }
}

function emit(next: readonly string[]) {
  current = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* private mode: favorites live in memory for this session */
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      load();
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  if (!loaded) load();
  return current;
}

export function useFavorites() {
  const ids = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
  const toggle = useCallback((id: string) => {
    const now = getSnapshot();
    emit(now.includes(id) ? now.filter((x) => x !== id) : [...now, id]);
  }, []);
  return { ids, toggle, has: (id: string) => ids.includes(id) };
}

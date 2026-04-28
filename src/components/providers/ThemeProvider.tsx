"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

export type ThemePreference = "hybrid" | "dark" | "light";

interface ThemeContextType {
  preference: ThemePreference;
  setPreference: (p: ThemePreference) => void;
  cyclePreference: () => void;
  mounted: boolean;
}

const STORAGE_KEY = "anduber-theme";
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const PREF_CLASSES = ["theme-hybrid", "theme-dark", "theme-light"] as const;

function applyPreferenceToDOM(pref: ThemePreference) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  PREF_CLASSES.forEach((c) => root.classList.remove(c));
  root.classList.add(`theme-${pref}`);

  if (pref === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>("hybrid");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let initial: ThemePreference = "hybrid";
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "dark" || saved === "light" || saved === "hybrid") {
        initial = saved;
      }
    } catch {
      // localStorage unavailable; fall through to default
    }
    setPreferenceState(initial);
    applyPreferenceToDOM(initial);
    setMounted(true);
  }, []);

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage failures (private mode etc.)
    }

    const root = document.documentElement;
    root.classList.add("theme-transition");
    applyPreferenceToDOM(next);
    window.setTimeout(() => {
      root.classList.remove("theme-transition");
    }, 350);
  }, []);

  const cyclePreference = useCallback(() => {
    setPreference(
      preference === "hybrid" ? "dark" : preference === "dark" ? "light" : "hybrid"
    );
  }, [preference, setPreference]);

  return (
    <ThemeContext.Provider value={{ preference, setPreference, cyclePreference, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

/**
 * Resolves a section's effective mode based on the user's theme preference.
 * - "hybrid" preference: respects the section's intended `variant`
 * - "dark"/"light" preference: forces all sections to that mode
 *
 * Returns the section variant prior to mount to avoid hydration mismatches.
 */
export function useSectionMode(variant: "dark" | "light"): "dark" | "light" {
  const { preference, mounted } = useTheme();
  if (!mounted) return variant;
  if (preference === "dark") return "dark";
  if (preference === "light") return "light";
  return variant;
}

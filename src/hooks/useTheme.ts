import { useState, useEffect } from "react";

type ThemeMode = "light" | "dark" | "system";
type EffectiveTheme = "light" | "dark";

/**
 * useTheme
 *
 * Manages light, dark, and system theme preferences with support for persistence and auto-detection.
 *
 * @param defaultTheme - Optional. The default theme mode ("light", "dark", or "system"). Defaults to "system".
 *
 * @returns An object containing:
 * - `theme`: The user's theme preference ("light", "dark", or "system").
 * - `currentTheme`: The currently applied theme ("light" or "dark").
 * - `setTheme`: Function to update the theme preference.
 * - `toggleTheme`: Function to toggle between light and dark modes.
 */
export const useTheme = (defaultTheme: ThemeMode = "system") => {
  const systemThemeMQ = window.matchMedia("(prefers-color-scheme: dark)");

  const getEffectiveTheme = (chosenTheme: ThemeMode): EffectiveTheme => {
    if (chosenTheme === "system") {
      return systemThemeMQ.matches ? "dark" : "light";
    }
    return chosenTheme;
  };

  const getInitialTheme = (): ThemeMode => {
    const savedTheme = localStorage.getItem("theme") as ThemeMode | null;
    return savedTheme || defaultTheme;
  };

  const [themePreference, setThemePreference] = useState<ThemeMode>(getInitialTheme);
  const [currentTheme, setCurrentTheme] = useState<EffectiveTheme>(() => getEffectiveTheme(getInitialTheme()));

  useEffect(() => {
    const root = document.documentElement;

    if (currentTheme === "dark") {
      root.style.colorScheme = "dark";
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.style.colorScheme = "light";
      root.classList.add("light");
      root.classList.remove("dark");
    }

    root.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  const setTheme = (newTheme: ThemeMode): void => {
    localStorage.setItem("theme", newTheme);
    setThemePreference(newTheme);
    setCurrentTheme(getEffectiveTheme(newTheme));
  };

  const toggleTheme = (): void => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setThemePreference(newTheme);
    setCurrentTheme(newTheme);
  };

  useEffect(() => {
    const handleSystemThemeChange = (e: MediaQueryListEvent): void => {
      if (themePreference === "system") {
        const newTheme: EffectiveTheme = e.matches ? "dark" : "light";
        setCurrentTheme(newTheme);
      }
    };

    systemThemeMQ.addEventListener("change", handleSystemThemeChange);

    return () => {
      systemThemeMQ.removeEventListener("change", handleSystemThemeChange);
    };
  }, [themePreference]);

  return {
    theme: themePreference,
    currentTheme,
    setTheme,
    toggleTheme,
  };
};

export default useTheme;

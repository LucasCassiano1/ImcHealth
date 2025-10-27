// src/contexts/ThemeContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SETTINGS_KEY = "@imc_settings";

const lightColors = {
  background: "#E8EEF0",
  card: "#ffffff",
  primary: "#49AAE2",
  text: "#21373b",
  subtext: "#6f7f82",
  accentDanger: "#D60000",
  inputBg: "#f6f6f6",
  itemBg: "#F4F6F7",
};

const darkColors = {
  background: "#0f1720",
  card: "#0b1a1f",
  primary: "#49AAE2",
  text: "#e6f1f4",
  subtext: "#9fb1b6",
  accentDanger: "#ff6b6b",
  inputBg: "#102023",
  itemBg: "#0b1a1f",
};

const ThemeContext = createContext({
  themeDark: false,
  colors: lightColors,
  loading: true,
  toggleTheme: (v) => {},
});

export function ThemeProvider({ children }) {
  const [themeDark, setThemeDark] = useState(false);
  const [loading, setLoading] = useState(true);

  // carrega preferência do AsyncStorage
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(SETTINGS_KEY);
        if (raw) {
          const json = JSON.parse(raw);
          if (typeof json.themeDark === "boolean") setThemeDark(json.themeDark);
        }
      } catch (e) {
        console.warn("Erro carregando tema:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // alterna tema e persiste apenas o flag de theme, mantendo outras prefs
  const toggleTheme = async (value) => {
    const next = typeof value === "boolean" ? value : !themeDark;
    setThemeDark(next);
    try {
      const raw = await AsyncStorage.getItem(SETTINGS_KEY);
      const json = raw ? JSON.parse(raw) : {};
      json.themeDark = next;
      await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(json));
    } catch (e) {
      console.warn("Erro persisitindo tema:", e);
    }
  };

  const colors = themeDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ themeDark, colors, loading, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

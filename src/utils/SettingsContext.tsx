import { createContext, useContext, useState, ReactNode } from "react";
import { useTranslation } from "react-i18next";

type Settings = {
  language: "es" | "en";
  theme: "light" | "dark";
  currency: "ARS" | "USD";
  easterEgg: true | false;
};

type SettingsContextType = {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();

  const [settings, setSettings] = useState<Settings>({
    language: i18n.language as "es" | "en",
    theme: "dark",
    currency: "ARS",
    easterEgg: false,
  });

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}

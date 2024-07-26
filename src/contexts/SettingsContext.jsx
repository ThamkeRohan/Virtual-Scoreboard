import React, { useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const SettingsContext = React.createContext();
const SettingsUpdateContext = React.createContext();

export function useSettings() {
  return useContext(SettingsContext);
}
export function useSettingsUpdate() {
  return useContext(SettingsUpdateContext);
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useLocalStorage("SETTINGS", {
    countNoBallOnWicket: true,
  });

  
  function updateSettings(key, value) {
    setSettings((prevSettings) => ({ ...prevSettings, [key]: value }));
  }
  return (
    <SettingsContext.Provider value={{settings}}>
      <SettingsUpdateContext.Provider value={{ updateSettings }}>
        {children}
      </SettingsUpdateContext.Provider>
    </SettingsContext.Provider>
  );
}

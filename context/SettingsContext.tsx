import React, { createContext, useEffect, useState } from "react";
import {loadSettings, saveSettings} from './SettingsStorage';
import {defaultSettings} from '../config/constants';

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [currentSettings, setCurrentSettings] = useState(undefined);

  useEffect(() => {
    const fetch = async () => {
      const data = await loadSettings();
      setCurrentSettings(data);
    }
    fetch();
  }, []);
  
  const setSettings = (settings: object) => {
    saveSettings(settings);
    setCurrentSettings(settings);
  }
  
  return (
    <SettingsContext.Provider value={{ settings: currentSettings, saveSettings: setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;

export default SettingsContext;

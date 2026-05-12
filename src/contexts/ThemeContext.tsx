import React, { createContext, useContext, useEffect, useState } from 'react';

type Preset = 'neo-brutalist' | 'acid-cyber';

interface ThemeContextType {
  preset: Preset;
  setPreset: (preset: Preset) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preset, setPresetState] = useState<Preset>('neo-brutalist');

  useEffect(() => {
    // Load from local storage on mount
    const savedPreset = localStorage.getItem('aseanlabs-preset') as Preset;
    if (savedPreset && (savedPreset === 'neo-brutalist' || savedPreset === 'acid-cyber')) {
      setPresetState(savedPreset);
      document.documentElement.setAttribute('data-preset', savedPreset);
    } else {
      document.documentElement.setAttribute('data-preset', 'neo-brutalist');
    }
  }, []);

  const setPreset = (newPreset: Preset) => {
    setPresetState(newPreset);
    localStorage.setItem('aseanlabs-preset', newPreset);
    document.documentElement.setAttribute('data-preset', newPreset);
  };

  return (
    <ThemeContext.Provider value={{ preset, setPreset }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

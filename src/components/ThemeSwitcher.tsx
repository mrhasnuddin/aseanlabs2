import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { ColorWheelIcon } from '@radix-ui/react-icons';

export function ThemeSwitcher() {
  const { preset, setPreset } = useTheme();

  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-xs font-bold uppercase tracking-widest text-struct flex items-center gap-2">
        <ColorWheelIcon width={14} height={14} /> Theme
      </span>
      <div className="flex bg-struct border-2 border-struct p-1 rounded-sm shadow-nb-sm">
        <button
          onClick={() => setPreset('neo-brutalist')}
          className={`px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
            preset === 'neo-brutalist' 
              ? 'bg-canvas text-struct shadow-none' 
              : 'text-canvas hover:text-canvas'
          }`}
          aria-label="Activate Neo-Brutalist theme"
        >
          Neo-Brutalist
        </button>
        <button
          onClick={() => setPreset('acid-cyber')}
          className={`px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
            preset === 'acid-cyber' 
              ? 'bg-accent text-struct shadow-none' 
              : 'text-canvas hover:text-accent'
          }`}
          aria-label="Activate Acid Cyber-Minimal theme"
        >
          Acid Cyber
        </button>
      </div>
    </div>
  );
}

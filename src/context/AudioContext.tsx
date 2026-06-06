'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import soundEngine from '@/utils/sound';

interface AudioContextType {
  audioEnabled: boolean;
  toggleAudio: () => void;
  playHover: () => void;
  playClick: () => void;
  playSuccess: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [audioEnabled, setAudioEnabled] = useState(false);

  // Initialize soundEngine settings state from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem('portfolio_audio_enabled');
    const isEnabled = saved === 'true';
    setAudioEnabled(isEnabled);
    if (soundEngine) {
      soundEngine.setEnabled(isEnabled);
    }
  }, []);

  const toggleAudio = () => {
    setAudioEnabled((prev) => {
      const newVal = !prev;
      localStorage.setItem('portfolio_audio_enabled', String(newVal));
      if (soundEngine) {
        soundEngine.setEnabled(newVal);
        // Play an immediate feedback pop when enabled
        if (newVal) {
          setTimeout(() => soundEngine?.playClickPop(), 50);
        }
      }
      return newVal;
    });
  };

  const playHover = () => {
    if (soundEngine) {
      soundEngine.playHoverBlip();
    }
  };

  const playClick = () => {
    if (soundEngine) {
      soundEngine.playClickPop();
    }
  };

  const playSuccess = () => {
    if (soundEngine) {
      soundEngine.playSuccessChime();
    }
  };

  return (
    <AudioContext.Provider value={{ audioEnabled, toggleAudio, playHover, playClick, playSuccess }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

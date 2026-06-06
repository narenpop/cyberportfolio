'use client';

import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAudio } from '@/context/AudioContext';
import styles from './ThemeCustomizer.module.css';

export const ThemeCustomizer: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { playClick, playHover } = useAudio();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    playClick();
    setIsOpen(!isOpen);
  };

  const handleSelectTheme = (selected: 'cyberpunk' | 'matrix' | 'sunset') => {
    playClick();
    setTheme(selected);
  };

  return (
    <div className={styles.customizer}>
      <div className={`${styles.panel} ${isOpen ? styles.panelActive : ''}`}>
        <button
          className={`${styles.themeOption} ${styles.cyberpunkBtn} ${
            theme === 'cyberpunk' ? styles.activeOption : ''
          }`}
          onClick={() => handleSelectTheme('cyberpunk')}
          onMouseEnter={playHover}
          title="Cyberpunk Nebula"
        >
          <span className={styles.tooltip}>Cyberpunk</span>
        </button>
        <button
          className={`${styles.themeOption} ${styles.matrixBtn} ${
            theme === 'matrix' ? styles.activeOption : ''
          }`}
          onClick={() => handleSelectTheme('matrix')}
          onMouseEnter={playHover}
          title="Matrix Digital"
        >
          <span className={styles.tooltip}>Matrix</span>
        </button>
        <button
          className={`${styles.themeOption} ${styles.sunsetBtn} ${
            theme === 'sunset' ? styles.activeOption : ''
          }`}
          onClick={() => handleSelectTheme('sunset')}
          onMouseEnter={playHover}
          title="Sunset Luxury"
        >
          <span className={styles.tooltip}>Sunset Gold</span>
        </button>
      </div>
      <button 
        className={styles.triggerBtn} 
        onClick={toggleOpen}
        onMouseEnter={playHover}
        aria-label="Theme Customizer"
      >
        <Palette size={20} />
      </button>
    </div>
  );
};

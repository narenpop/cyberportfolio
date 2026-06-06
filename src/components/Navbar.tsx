'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const { audioEnabled, toggleAudio, playClick, playHover } = useAudio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    playClick();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset for floating navbar
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleAudioToggle = () => {
    toggleAudio();
  };

  const toggleMobileMenu = () => {
    playClick();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.navContainer}>
          <button 
            className={styles.logo} 
            onClick={() => handleNavClick('hero')}
            onMouseEnter={playHover}
          >
            <Sparkles size={22} className="animated-float" />
            <span>Naren</span>
          </button>

          <nav className={styles.navLinks}>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={playHover}
                className={styles.navLink}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className={styles.controls}>
            {/* Audio Toggle Button */}
            <button
              onClick={handleAudioToggle}
              onMouseEnter={playHover}
              className={styles.iconBtn}
              title={audioEnabled ? 'Mute Interface Sounds' : 'Unmute Interface Sounds'}
              aria-label="Toggle Audio"
            >
              {audioEnabled ? (
                <div className={styles.audioWaves}>
                  <div className={`${styles.wave} ${styles.waveActive}`} />
                  <div className={`${styles.wave} ${styles.waveActive}`} />
                  <div className={`${styles.wave} ${styles.waveActive}`} />
                  <div className={`${styles.wave} ${styles.waveActive}`} />
                </div>
              ) : (
                <VolumeX size={18} />
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={toggleMobileMenu}
              onMouseEnter={playHover}
              className={`${styles.iconBtn} ${styles.menuToggle}`}
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuActive : ''}`}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            onMouseEnter={playHover}
            className={styles.mobileLink}
          >
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
};

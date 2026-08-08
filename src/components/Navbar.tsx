'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const { playClick, playHover } = useAudio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    playClick();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
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
            Naren
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

          <button
            onClick={() => {
              playClick();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            onMouseEnter={playHover}
            className={styles.menuToggle}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

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

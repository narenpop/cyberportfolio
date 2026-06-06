'use client';

import React, { useState, useEffect } from 'react';
import { useAudio } from '@/context/AudioContext';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  const { playClick, playHover } = useAudio();
  const [typedText, setTypedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = [
    'Full-Stack Developer',
    'UI/UX Creative Tech Designer',
    'React & Next.js Wizard',
    'Interactive Experience Builder',
  ];

  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseDuration = 2000;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      // Deleting text
      timer = setTimeout(() => {
        setTypedText(currentPhrase.substring(0, typedText.length - 1));
      }, deletingSpeed);
    } else {
      // Typing text
      timer = setTimeout(() => {
        setTypedText(currentPhrase.substring(0, typedText.length + 1));
      }, typingSpeed);
    }

    // Handle transition between typing and deleting
    if (!isDeleting && typedText === currentPhrase) {
      timer = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIndex]);

  const handleScrollTo = (sectionId: string) => {
    playClick();
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className={styles.hero}>
      {/* Dynamic blurred ambient glow backdrops */}
      <div className={styles.glowBall1} />
      <div className={styles.glowBall2} />

      <div className={styles.content}>
        <span className={styles.greeting}>Welcome to my space</span>
        
        <h1 className={styles.title}>
          <span className={styles.gradientText}>Fullstack developer</span>
          <span className={styles.accentText}>Immersive Digital Art</span>
        </h1>

        <div className={styles.subtitle}>
          I am a fullstack developer <span className={styles.typewriter}>{typedText}</span>
        </div>

        <p className={styles.description}>
        with 3+ years of experience building fast, responsive, and user-friendly web applications. I specialize in React.js, Next.js, and Tailwind CSS, transforming ideas into engaging digital experiences with clean code and modern design.
        </p>

        <div className={styles.ctas}>
          <button
            onClick={() => handleScrollTo('projects')}
            onMouseEnter={playHover}
            className={styles.btnPrimary}
          >
            Explore Projects
          </button>
          <button
            onClick={() => handleScrollTo('contact')}
            onMouseEnter={playHover}
            className={styles.btnSecondary}
          >
            Get In Touch
          </button>
        </div>
      </div>

      <button
        onClick={() => handleScrollTo('about')}
        onMouseEnter={playHover}
        className={styles.scrollIndicator}
        aria-label="Scroll to About"
      >
        <span>Scroll Down</span>
        <div className={styles.mouseIcon}>
          <div className={styles.wheel} />
        </div>
      </button>
    </section>
  );
};

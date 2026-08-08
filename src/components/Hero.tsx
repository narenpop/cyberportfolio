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
    'React & Next.js',
    'Clean UI Builder',
  ];

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const currentPhrase = phrases[phraseIndex];
    const typingSpeed = isDeleting ? 40 : 90;
    const pauseDuration = 1800;

    if (!isDeleting && typedText === currentPhrase) {
      timer = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    } else {
      timer = setTimeout(() => {
        setTypedText(
          isDeleting
            ? currentPhrase.substring(0, typedText.length - 1)
            : currentPhrase.substring(0, typedText.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIndex]);

  const handleScrollTo = (sectionId: string) => {
    playClick();
    const element = document.getElementById(sectionId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.atmosphere} aria-hidden />
      <div className={styles.content}>
        <p className={styles.brand}>Naren</p>
        <h1 className={styles.title}>
          Building clear, fast web products
        </h1>
        <p className={styles.subtitle}>
          <span className={styles.typewriter}>{typedText}</span>
        </p>
        <p className={styles.description}>
          Full-stack developer with 3+ years crafting responsive apps in React,
          Next.js, and TypeScript — focused on clean code and calm, usable design.
        </p>
        <div className={styles.ctas}>
          <button
            onClick={() => handleScrollTo('projects')}
            onMouseEnter={playHover}
            className={styles.btnPrimary}
          >
            View projects
          </button>
          <button
            onClick={() => handleScrollTo('contact')}
            onMouseEnter={playHover}
            className={styles.btnSecondary}
          >
            Get in touch
          </button>
        </div>
      </div>
    </section>
  );
};

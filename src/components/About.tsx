'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useAudio } from '@/context/AudioContext';
import styles from './About.module.css';

export const About: React.FC = () => {
  const { playHover } = useAudio();
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Intersection observer for text scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 3D Tilt calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Mouse coordinates relative to card center
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;

    // Normalize values
    const nx = x / (width / 2);
    const ny = y / (height / 2);

    // Max rotation angles (degrees)
    const maxTilt = 12;
    const rx = -ny * maxTilt;
    const ry = nx * maxTilt;

    // Apply styles to card
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.03, 1.03, 1.03)`;
    
    // Set custom properties for lighting shine follow
    const px = ((e.clientX - rect.left) / width) * 100;
    const py = ((e.clientY - rect.top) / height) * 100;
    card.style.setProperty('--mouse-x', `${px}%`);
    card.style.setProperty('--mouse-y', `${py}%`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    // Reset transform smoothly
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <section id="about" className={`section-container ${styles.about}`} ref={containerRef}>
      <h2 className="section-title">About Me</h2>

      <div className={styles.grid}>
        {/* Left Side: 3D Tilt Card */}
        <div className={styles.cardContainer}>
          <div
            ref={cardRef}
            className={styles.tiltCard}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={playHover}
          >
            <div className={styles.cardGlow} />
            <div className={styles.imageWrapper}>
              <Image
                src="/profile.png"
                alt="Profile avatar"
                fill
                className={styles.image}
                priority
                sizes="(max-width: 768px) 100vw, 380px"
              />
            </div>
            <div className={styles.cardDetails}>
              <span className={styles.name}>CREATIVE DEV</span>
              <span className={styles.tag}>AVATAR.SYS</span>
            </div>
          </div>
        </div>

        {/* Right Side: Info & Stats */}
        <div className={styles.info}>
          <span className={`${styles.subheading} ${styles.revealText} ${isRevealed ? styles.revealed : ''}`}>
            Who is Naren?
          </span>
          
          <h3 className={`${styles.bio} ${styles.revealText} ${isRevealed ? styles.revealed : ''}`}>
            I am a full-stack engineer and interactive designer who bridges the gap between 
            <span className={styles.highlight}> high-performance backend systems</span> and 
            <span className={styles.highlight}> breathtaking creative frontends</span>.
          </h3>

          <p className={`${styles.bio} ${styles.revealText} ${isRevealed ? styles.revealed : ''}`}>
            With over 5 years of industry experience, I build systems that are not only 
            technically sound but feel alive, intuitive, and responsive. I specialize in React, Next.js, 
            Node.js, TypeScript, and interactive audio-visual integrations.
          </p>

          {/* Stats Showcase */}
          <div className={`${styles.statsGrid} ${styles.revealText} ${isRevealed ? styles.revealed : ''}`}>
            <div className={styles.statItem}>
              <div className={styles.statVal}>5+</div>
              <div className={styles.statLabel}>Years Experience</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statVal}>40+</div>
              <div className={styles.statLabel}>Projects Shipped</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statVal}>99%</div>
              <div className={styles.statLabel}>Aesthetic Score</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './About.module.css';

export const About: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

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

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className={`section-container ${styles.about}`} ref={containerRef}>
      <h2 className="section-title">About</h2>

      <div className={styles.grid}>
        <div className={`${styles.portrait} ${isRevealed ? styles.revealed : ''}`}>
          <div className={styles.imageWrapper}>
            <Image
              src="/profile.png"
              alt="Portrait of Naren"
              fill
              className={styles.image}
              priority
              sizes="(max-width: 768px) 100vw, 360px"
            />
          </div>
        </div>

        <div className={styles.info}>
          <p className={`${styles.lead} ${styles.revealText} ${isRevealed ? styles.revealed : ''}`}>
            I build web applications that feel calm, fast, and easy to use —
            from solid backends to thoughtful frontends.
          </p>

          <p className={`${styles.bio} ${styles.revealText} ${isRevealed ? styles.revealed : ''}`}>
            I work primarily with React, Next.js, Node.js, and TypeScript.
            I care about readable code, clear structure, and interfaces that
            stay out of the way.
          </p>

          <div className={`${styles.stats} ${styles.revealText} ${isRevealed ? styles.revealed : ''}`}>
            <div>
              <span className={styles.statVal}>3+</span>
              <span className={styles.statLabel}>Years experience</span>
            </div>
            <div>
              <span className={styles.statVal}>5</span>
              <span className={styles.statLabel}>Featured projects</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

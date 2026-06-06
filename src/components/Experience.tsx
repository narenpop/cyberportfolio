'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Briefcase } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';
import styles from './Experience.module.css';

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  date: string;
  description: string;
}

const TimelineCard: React.FC<{ item: ExperienceItem; index: number }> = ({ item, index }) => {
  const { playHover } = useAudio();
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={elementRef}
      className={`${styles.item} ${isVisible ? styles.itemRevealed : ''}`}
    >
      <div className={styles.dot} />
      <div
        className={`${styles.card} ${isEven ? styles.leftCard : styles.rightCard}`}
        onMouseEnter={playHover}
      >
        <div className={styles.header}>
          <div>
            <h3 className={styles.role}>{item.role}</h3>
            <span className={styles.company}>{item.company}</span>
          </div>
          <span className={styles.date}>{item.date}</span>
        </div>
        <p className={styles.description}>{item.description}</p>
      </div>
    </div>
  );
};

export const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      role: 'Lead Frontend Engineer',
      company: 'RR IT solutions',
      date: '2024 - PRESENT',
      description: 'Architecting high-performance web applications using Next.js App Router and the new React Compiler. Led the design and development of an internal custom web-component design system, cutting initial load times by 40% and increasing developer velocity by 25%.',
    },
    {
      id: 2,
      role: 'Frontend developer',
      company: 'Outofbox technologies',
      date: '2020 - 2022',
      description: 'Engineered immersive, highly animated 3D visual marketing campaigns and audio-reactive web installations for premium clients. Optimized complex canvas renderings and implemented low-latency Web Audio API synthesizers and interactions.',
    },
    {
      id: 3,
      role: 'Analyst',
      company: 'Amazon',
      date: '2019 - 2019',
      description: 'Maintained and scaled high-traffic PostgreSQL database clusters and constructed real-time messaging dashboards. Designed fluid UI animations and micro-interactions, raising user engagement scores by 18%.',
    },
  ];

  return (
    <section id="experience" className={`section-container ${styles.experience}`}>
      <h2 className="section-title">
        <Briefcase size={28} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
        Work Experience
      </h2>

      <div className={styles.timeline}>
        {experiences.map((item, index) => (
          <TimelineCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './Experience.module.css';

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  date: string;
  description: string;
}

const TimelineCard: React.FC<{ item: ExperienceItem }> = ({ item }) => {
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
      { threshold: 0.2 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={elementRef}
      className={`${styles.item} ${isVisible ? styles.itemRevealed : ''}`}
    >
      <div className={styles.meta}>
        <span className={styles.date}>{item.date}</span>
        <span className={styles.company}>{item.company}</span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.role}>{item.role}</h3>
        <p className={styles.description}>{item.description}</p>
      </div>
    </article>
  );
};

export const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      id: 1,
      role: 'Lead Frontend Engineer',
      company: 'RR IT Solutions',
      date: '2024 — Present',
      description:
        'Building high-performance web apps with Next.js and React. Led an internal design system that cut load times and sped up delivery.',
    },
    {
      id: 2,
      role: 'Frontend Developer',
      company: 'Outofbox Technologies',
      date: '2020 — 2022',
      description:
        'Shipped animated marketing experiences and interactive web installs for clients, with a focus on performance and polish.',
    },
    {
      id: 3,
      role: 'Analyst',
      company: 'Amazon',
      date: '2019',
      description:
        'Supported data and dashboard work on high-traffic systems, improving clarity and day-to-day usability for internal teams.',
    },
  ];

  return (
    <section id="experience" className="section-container">
      <h2 className="section-title">Experience</h2>
      <div className={styles.timeline}>
        {experiences.map((item) => (
          <TimelineCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

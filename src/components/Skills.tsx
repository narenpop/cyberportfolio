'use client';

import React, { useState } from 'react';
import { useAudio } from '@/context/AudioContext';
import styles from './Skills.module.css';

type Category = 'all' | 'frontend' | 'backend' | 'tools';

interface Skill {
  name: string;
  category: Exclude<Category, 'all'>;
}

export const Skills: React.FC = () => {
  const { playClick, playHover } = useAudio();
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const skillsList: Skill[] = [
    { name: 'React', category: 'frontend' },
    { name: 'Next.js', category: 'frontend' },
    { name: 'TypeScript', category: 'frontend' },
    { name: 'HTML & CSS', category: 'frontend' },
    { name: 'Tailwind CSS', category: 'frontend' },
    { name: 'Node.js', category: 'backend' },
    { name: 'PostgreSQL', category: 'backend' },
    { name: 'GraphQL', category: 'backend' },
    { name: 'Redis', category: 'backend' },
    { name: 'Docker', category: 'tools' },
    { name: 'Figma', category: 'tools' },
    { name: 'Git', category: 'tools' },
  ];

  const filteredSkills = skillsList.filter(
    (skill) => activeCategory === 'all' || skill.category === activeCategory
  );

  return (
    <section id="skills" className={`section-container ${styles.skills}`}>
      <h2 className="section-title">Skills</h2>

      <div className={styles.filters}>
        {(['all', 'frontend', 'backend', 'tools'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => {
              playClick();
              setActiveCategory(cat);
            }}
            onMouseEnter={playHover}
            className={`${styles.filterBtn} ${activeCategory === cat ? styles.activeFilter : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <ul className={styles.list}>
        {filteredSkills.map((skill) => (
          <li key={skill.name} className={styles.skill}>
            {skill.name}
          </li>
        ))}
      </ul>
    </section>
  );
};

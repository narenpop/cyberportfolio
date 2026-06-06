'use client';

import React, { useState } from 'react';
import { 
  Code, Layers, Cpu, Globe, Terminal, Database, 
  Workflow, Flame, Shield, Volume2, Palette, GitBranch 
} from 'lucide-react';
import { useAudio } from '@/context/AudioContext';
import styles from './Skills.module.css';

interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools';
  color: string;
  glowColor: string;
  glowSoft: string;
  level: 'Expert' | 'Advanced' | 'Intermediate';
  icon: React.ComponentType<any>;
}

export const Skills: React.FC = () => {
  const { playClick, playHover } = useAudio();
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'tools'>('all');

  const skillsList: Skill[] = [
    { name: 'React', category: 'frontend', color: '#61dafb', glowColor: 'rgba(97, 218, 251, 0.4)', glowSoft: 'rgba(97, 218, 251, 0.12)', level: 'Expert', icon: Cpu },
    { name: 'Next.js', category: 'frontend', color: '#ffffff', glowColor: 'rgba(255, 255, 255, 0.3)', glowSoft: 'rgba(255, 255, 255, 0.08)', level: 'Expert', icon: Layers },
    { name: 'TypeScript', category: 'frontend', color: '#3178c6', glowColor: 'rgba(49, 120, 198, 0.4)', glowSoft: 'rgba(49, 120, 198, 0.12)', level: 'Expert', icon: Code },
    { name: 'HTML & CSS', category: 'frontend', color: '#e34f26', glowColor: 'rgba(227, 79, 38, 0.4)', glowSoft: 'rgba(227, 79, 38, 0.12)', level: 'Expert', icon: Globe },
    { name: 'Node.js', category: 'backend', color: '#339933', glowColor: 'rgba(51, 153, 51, 0.4)', glowSoft: 'rgba(51, 153, 51, 0.12)', level: 'Expert', icon: Terminal },
    { name: 'PostgreSQL', category: 'backend', color: '#4169e1', glowColor: 'rgba(65, 105, 225, 0.4)', glowSoft: 'rgba(65, 105, 225, 0.12)', level: 'Advanced', icon: Database },
    { name: 'GraphQL', category: 'backend', color: '#e10098', glowColor: 'rgba(225, 0, 152, 0.4)', glowSoft: 'rgba(225, 0, 152, 0.12)', level: 'Advanced', icon: Workflow },
    { name: 'Redis Cache', category: 'backend', color: '#dc382d', glowColor: 'rgba(220, 56, 45, 0.4)', glowSoft: 'rgba(220, 56, 45, 0.12)', level: 'Advanced', icon: Flame },
    { name: 'Docker', category: 'tools', color: '#2496ed', glowColor: 'rgba(36, 150, 237, 0.4)', glowSoft: 'rgba(36, 150, 237, 0.12)', level: 'Advanced', icon: Shield },
    { name: 'Web Audio API', category: 'tools', color: '#ff007f', glowColor: 'rgba(255, 0, 127, 0.4)', glowSoft: 'rgba(255, 0, 127, 0.12)', level: 'Advanced', icon: Volume2 },
    { name: 'Figma Layout', category: 'tools', color: '#f24e1e', glowColor: 'rgba(242, 78, 30, 0.4)', glowSoft: 'rgba(242, 78, 30, 0.12)', level: 'Intermediate', icon: Palette },
    { name: 'Git & Actions', category: 'tools', color: '#f05032', glowColor: 'rgba(240, 80, 50, 0.4)', glowSoft: 'rgba(240, 80, 50, 0.12)', level: 'Expert', icon: GitBranch },
  ];

  const handleFilterClick = (category: 'all' | 'frontend' | 'backend' | 'tools') => {
    playClick();
    setActiveCategory(category);
  };

  const filteredSkills = skillsList.filter(
    (skill) => activeCategory === 'all' || skill.category === activeCategory
  );

  return (
    <section id="skills" className="section-container">
      <h2 className="section-title">Skills & Technologies</h2>

      {/* Filter Buttons */}
      <div className={styles.filters}>
        {(['all', 'frontend', 'backend', 'tools'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilterClick(cat)}
            onMouseEnter={playHover}
            className={`${styles.filterBtn} ${activeCategory === cat ? styles.activeFilter : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skill Cards Grid */}
      <div className={styles.grid}>
        {filteredSkills.map((skill) => {
          const Icon = skill.icon;
          return (
            <div
              key={skill.name}
              className={styles.skillCard}
              onMouseEnter={playHover}
              style={{
                // Pass custom CSS variables dynamically
                '--skill-color': skill.color,
                '--skill-color-glow': skill.glowColor,
                '--skill-color-glow-soft': skill.glowSoft,
              } as React.CSSProperties}
            >
              <div className={styles.cardGlow} />
              
              <div className={styles.cardContent}>
                <div className={styles.iconWrapper}>
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <span className={styles.skillName}>{skill.name}</span>
                <span className={styles.levelIndicator}>{skill.level}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

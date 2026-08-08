'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ExternalLink, X } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';
import styles from './Projects.module.css';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Project {
  id: number;
  title: string;
  shortDesc: string;
  longDesc: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Ecommerce website',
    shortDesc: 'Minimal storefront for browsing products, cart, and checkout.',
    longDesc:
      'Minimalist ecommerce site built with Next.js, Tailwind CSS, and TypeScript. Users can browse products, add them to cart, and checkout.',
    image: '/project-ecommerce.png',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    demoUrl: 'https://minimalist-ecommerce-4sop.vercel.app/',
    githubUrl: 'https://github.com/narenpop/minimalist-ecommerce',
  },
  {
    id: 2,
    title: 'Pets gallery',
    shortDesc: 'Gallery for viewing and adding pets.',
    longDesc:
      'Pets gallery built with React, Tailwind CSS, and TypeScript for browsing and managing pet listings.',
    image: '/project-pets.png',
    tags: ['React', 'TypeScript', 'Node.js'],
    demoUrl: 'https://pets-gallery-91nn.vercel.app/',
    githubUrl: 'https://github.com/narenpop/pets-gallery',
  },
  {
    id: 3,
    title: 'Vaasagar Vattam',
    shortDesc: 'Bookstore for browsing and buying books.',
    longDesc:
      'Bookstore built with Next.js, Tailwind CSS, and TypeScript for browsing books and completing purchases.',
    image: '/project-vaasagar.png',
    tags: ['Next.js', 'TypeScript'],
    demoUrl: 'https://vaasagarvattam.com/',
    githubUrl: 'https://github.com/narenpop/vaasagarvattam',
  },
  {
    id: 4,
    title: 'Prime Nest',
    shortDesc: 'Real estate site for browsing properties.',
    longDesc:
      'Real estate website built with Next.js, Tailwind CSS, and TypeScript for browsing and exploring property listings.',
    image: '/project-primenest.png',
    tags: ['Next.js', 'TypeScript'],
    demoUrl: 'https://primenest-sigma.vercel.app/',
    githubUrl: 'https://github.com/narenpop/primenest',
  },
  {
    id: 5,
    title: 'Avua',
    shortDesc: 'Job portal for finding and applying to roles.',
    longDesc:
      'Job portal built with Next.js, Tailwind CSS, and TypeScript for browsing jobs and managing applications.',
    image: '/project-avua.png',
    tags: ['Next.js', 'TypeScript'],
    demoUrl: 'https://avua-swart.vercel.app/',
    githubUrl: 'https://github.com/narenpop/avua',
  },
  {
    id: 6,
    title: 'FOOD rush',
    shortDesc: 'food delivery website for browsing and ordering food.',
    longDesc:'Food delivery website built with Next.js, Tailwind CSS, and TypeScript for browsing and ordering food.',
    image: '/project-foodrush.png',
    tags: ['react.js', 'vite',   'tailwindcss', 'javascript'],
    demoUrl: 'https://cool-lovelace-gules.vercel.app/',
    githubUrl: 'https://github.com/narenpop/food-delivery',
  }
];

export const Projects: React.FC = () => {
  const { playClick, playHover } = useAudio();
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    document.body.style.overflow = activeProject ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeProject]);

  return (
    <section id="projects" className={`section-container ${styles.projects}`}>
      <h2 className="section-title">Projects</h2>

      <div className={styles.grid}>
        {projects.map((project) => (
          <button
            key={project.id}
            type="button"
            className={styles.card}
            onMouseEnter={playHover}
            onClick={() => {
              playClick();
              setActiveProject(project);
            }}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                className={styles.image}
                sizes="(max-width: 768px) 100vw, 360px"
              />
            </div>
            <div className={styles.info}>
              <div className={styles.cardHeader}>
                <h3 className={styles.title}>{project.title}</h3>
                <ArrowUpRight size={18} className={styles.arrow} />
              </div>
              <p className={styles.description}>{project.shortDesc}</p>
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      {activeProject && (
        <div
          className={styles.modalOverlay}
          onClick={() => {
            playClick();
            setActiveProject(null);
          }}
        >
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => {
                playClick();
                setActiveProject(null);
              }}
              onMouseEnter={playHover}
              className={styles.btnClose}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className={styles.modalImageWrapper}>
              <Image
                src={activeProject.image}
                alt={activeProject.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 992px) 100vw, 800px"
              />
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalMeta}>
                <div>
                  <h3 className={styles.modalTitle}>{activeProject.title}</h3>
                  <div className={styles.tags} style={{ marginTop: 10 }}>
                    {activeProject.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={styles.modalActions}>
                  <a
                    href={activeProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    onMouseEnter={playHover}
                    className={styles.modalLink}
                  >
                    Live demo
                    <ExternalLink size={14} />
                  </a>
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    onMouseEnter={playHover}
                    className={styles.modalLinkSec}
                  >
                    Source
                    <GithubIcon style={{ width: 14, height: 14 }} />
                  </a>
                </div>
              </div>
              <p className={styles.modalDesc}>{activeProject.longDesc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

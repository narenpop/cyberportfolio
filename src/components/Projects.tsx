'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, ExternalLink, X, Sparkles } from 'lucide-react';
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

const ProjectCard: React.FC<{ project: Project; onOpenModal: (p: Project) => void }> = ({ project, onOpenModal }) => {
  const { playHover, playClick } = useAudio();
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;

    const nx = x / (width / 2);
    const ny = y / (height / 2);

    const maxTilt = 8;
    const rx = -ny * maxTilt;
    const ry = nx * maxTilt;

    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02, 1.02, 1.02)`;

    const px = ((e.clientX - rect.left) / width) * 100;
    const py = ((e.clientY - rect.top) / height) * 100;
    card.style.setProperty('--mouse-x', `${px}%`);
    card.style.setProperty('--mouse-y', `${py}%`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div className={styles.cardContainer}>
      <div
        ref={cardRef}
        className={styles.card}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={playHover}
        onClick={() => {
          playClick();
          onOpenModal(project);
        }}
      >
        <div className={styles.cardGlow} />
        
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
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.description}>{project.shortDesc}</p>
          
          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>

          <button className={`${styles.btnDetails} interactive`}>
            <span>View Details</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export const Projects: React.FC = () => {
  const { playClick, playHover } = useAudio();
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Ecommerce website',
      shortDesc: 'Ecommerce website for a client where users can buy and sell products.',
      longDesc: 'Minimalist ecommerce website built with Next.js, Tailwind CSS, and TypeScript. It allows users to browse products, add them to cart, and checkout.',
      image: '/project1.png',
      tags: ['Next.js', 'Web Audio API', 'HTML5 Canvas', 'CSS Grid'],
      demoUrl: 'https://minimalist-ecommerce-4sop.vercel.app/',
      githubUrl: 'https://github.com/narenpop/minimalist-ecommerce',
    },
    {
      id: 2,
      title: 'Pets gallery',
      shortDesc: 'pets gallery website for a client where users can view and add pets.',
      longDesc: 'Pets gallery website built with React, Tailwind CSS, and TypeScript. It allows users to browse pets, add them to cart, and checkout.',
      image: '/project2.png',
      tags: ['React', 'PostgreSQL', 'TypeScript', 'Node.js'],
      demoUrl: 'https://pets-gallery-91nn.vercel.app/',
      githubUrl: 'https://github.com/narenpop/pets-gallery',
    },
    {
      id: 3,
      title: 'Vaasagar vattam',
      shortDesc: 'Book store website for a client where users can buy and sell books.',
      longDesc: 'Book store built with Next.js, Tailwind CSS, and TypeScript. It allows users to browse books, add them to cart, and checkout.',
      image: '/project3.png',
      tags: ['TypeScript', 'Canvas 2D', 'Web Audio Synth', 'Local Storage'],
      demoUrl: 'https://vaasagarvattam.com/',
      githubUrl: 'https://github.com/narenpop/vaasagarvattam',
    },
    {
      id: 4,
      title: 'Prime nest',
      shortDesc: 'Real estate website for a client where users can buy and sell properties.',
      longDesc: 'Real estate website built with next js, tailwind css, and typescript. It allows users to browse properties, add them to cart, and checkout.',
      image: '/project3.png',
      tags: ['TypeScript', 'Canvas 2D', 'Web Audio Synth', 'Local Storage'],
      demoUrl: 'https://primenest-sigma.vercel.app/',
      githubUrl: 'https://github.com/narenpop/primenest',
    }
  ];

  // Prevent scroll when modal is open
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeProject]);

  const handleCloseModal = () => {
    playClick();
    setActiveProject(null);
  };

  return (
    <section id="projects" className="section-container">
      <h2 className="section-title">
        <Sparkles size={26} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
        Featured Projects
      </h2>

      <div className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenModal={setActiveProject}
          />
        ))}
      </div>

      {/* Modal Overlay */}
      {activeProject && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()} // Prevent closing
          >
            <button
              onClick={handleCloseModal}
              onMouseEnter={playHover}
              className={styles.btnClose}
              aria-label="Close details"
            >
              <X size={20} />
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
                  <div className={styles.tags} style={{ marginTop: '8px' }}>
                    {activeProject.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </div>

                <div className={styles.modalActions}>
                  <a
                    href={activeProject.demoUrl}
                    onClick={playClick}
                    onMouseEnter={playHover}
                    className={`${styles.modalLink} interactive`}
                  >
                    <span>Live Demo</span>
                    <ExternalLink size={16} />
                  </a>
                  <a
                    href={activeProject.githubUrl}
                    onClick={playClick}
                    onMouseEnter={playHover}
                    className={`${styles.modalLinkSec} interactive`}
                  >
                    <span>Source Code</span>
                    <GithubIcon style={{ width: 16, height: 16 }} />
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

'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Experience } from '@/components/Experience';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      {/* Floating navigation header */}
      <Navbar />

      <main style={{ minHeight: '100vh', position: 'relative', zIndex: 10 }}>
        {/* Hero Landing Section */}
        <Hero />

        {/* About Profile & Info Section */}
        <About />

        {/* Category Skill Card Nodes Grid */}
        <Skills />

        {/* Glowing Alternate Career History Timeline */}
        <Experience />

        {/* 3D Tilt Project Cards & Info Modal dialogs */}
        <Projects />

        {/* Contact form validation submissions */}
        <Contact />
      </main>

      {/* Social channels and Scroll Top utility */}
      <Footer />
    </>
  );
}

'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  originalSize: number;
}

interface MatrixColumn {
  x: number;
  chars: { char: string; y: number; opacity: number }[];
  speed: number;
  nextSpawn: number;
}

export const CanvasBackground: React.FC = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, targetX: -9999, targetY: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle Setup
    const particles: Particle[] = [];
    const particleCount = Math.min(80, Math.floor((width * height) / 15000));

    const getThemeColors = () => {
      if (theme === 'sunset') {
        return ['#d4af37', '#f39c12', '#e74c3c', '#cbd5e1'];
      }
      // Cyberpunk default
      return ['#00f2fe', '#ff007f', '#a855f7', '#3b82f6'];
    };

    const initParticles = () => {
      particles.length = 0;
      const colors = getThemeColors();
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 2 + 1;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: size,
          originalSize: size,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    initParticles();

    // Matrix Rain Setup
    const matrixChars = '日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const columnWidth = 20;
    const columns: MatrixColumn[] = [];
    const columnCount = Math.ceil(width / columnWidth);

    const initMatrix = () => {
      columns.length = 0;
      for (let i = 0; i < columnCount; i++) {
        columns.push({
          x: i * columnWidth,
          chars: [],
          speed: Math.random() * 3 + 2,
          nextSpawn: Math.random() * 100,
        });
      }
    };

    initMatrix();

    // Resize Handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
      initMatrix();
    };

    window.addEventListener('resize', handleResize);

    // Mouse Listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -9999;
      mouseRef.current.targetY = -9999;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Main Loop
    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth cursor lerp
      const mouse = mouseRef.current;
      if (mouse.targetX !== -9999) {
        mouse.x += (mouse.targetX - mouse.x) * 0.1;
        mouse.y += (mouse.targetY - mouse.y) * 0.1;
      } else {
        mouse.x = -9999;
        mouse.y = -9999;
      }

      if (theme === 'matrix') {
        // Draw Matrix Code Rain
        ctx.font = '14px monospace';
        
        columns.forEach((col) => {
          // Update existing characters
          col.chars.forEach((c) => {
            c.opacity -= 0.015; // Slow fade
          });
          col.chars = col.chars.filter((c) => c.opacity > 0);

          // Add a new character at the bottom
          col.nextSpawn -= col.speed;
          if (col.nextSpawn <= 0) {
            const lastCharY = col.chars.length > 0 ? col.chars[col.chars.length - 1].y : 0;
            const newY = lastCharY + 16;
            
            if (newY < height + 100) {
              const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
              col.chars.push({ char, y: newY, opacity: 1.0 });
            } else {
              // Reset column to top
              col.chars = [];
            }
            col.nextSpawn = Math.random() * 80 + 30;
          }

          // Draw characters
          col.chars.forEach((c, index) => {
            // Newest character is bright white-green, others are green
            const isLatest = index === col.chars.length - 1;
            if (isLatest) {
              ctx.fillStyle = `rgba(200, 255, 200, ${c.opacity})`;
            } else {
              ctx.fillStyle = `rgba(0, 255, 70, ${c.opacity * 0.7})`;
            }
            ctx.fillText(c.char, col.x, c.y);
          });
        });

      } else {
        // Draw Particles (Cyberpunk or Sunset)
        const colors = getThemeColors();
        particles.forEach((p) => {
          // Physics
          p.x += p.vx;
          p.y += p.vy;

          // Boundary wrap
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Mouse attraction/repulsion
          if (mouse.x !== -9999) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 180) {
              const force = (180 - dist) / 180;
              const angle = Math.atan2(dy, dx);
              
              // Soft push away
              p.x += Math.cos(angle) * force * 1.8;
              p.y += Math.sin(angle) * force * 1.8;
              p.size = p.originalSize + force * 1.5;
            } else {
              // Revert back to original size slowly
              p.size += (p.originalSize - p.size) * 0.1;
            }
          } else {
            p.size += (p.originalSize - p.size) * 0.1;
          }

          // Draw
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          // Apply opacity based on particle speed/originalSize
          ctx.globalAlpha = 0.35 + (p.size / 4) * 0.35;
          ctx.fill();
        });
        ctx.globalAlpha = 1.0; // Reset
      }

      animationId = requestAnimationFrame(tick);
    };

    tick();

    // Clean up
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
};

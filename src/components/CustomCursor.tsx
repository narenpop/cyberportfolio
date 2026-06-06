'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './CustomCursor.module.css';

export const CustomCursor: React.FC = () => {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const outerRef = useRef<HTMLDivElement | null>(null);
  
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Keep track of exact mouse coordinates
  const mouseRef = useRef({ x: 0, y: 0 });
  // Keep track of smoothed (lagged) coordinates for the outer ring
  const smoothedRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
        // Instant sync outer ring on first movement
        smoothedRef.current.x = e.clientX;
        smoothedRef.current.y = e.clientY;
      }

      // Check if hovered element is interactive
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = 
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.closest('a') !== null ||
          target.closest('button') !== null ||
          target.closest('.interactive') !== null ||
          window.getComputedStyle(target).cursor === 'pointer';
        
        setIsHovered(isClickable);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    let animationId: number;

    const renderLoop = () => {
      if (innerRef.current && outerRef.current && isVisible) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        // Move the inner dot instantly
        innerRef.current.style.left = `${mx}px`;
        innerRef.current.style.top = `${my}px`;

        // Smoothly interpolate (lerp) the outer ring position
        // smoothed = smoothed + (target - smoothed) * factor
        smoothedRef.current.x += (mx - smoothedRef.current.x) * 0.15;
        smoothedRef.current.y += (my - smoothedRef.current.y) * 0.15;

        outerRef.current.style.left = `${smoothedRef.current.x}px`;
        outerRef.current.style.top = `${smoothedRef.current.y}px`;
      }

      animationId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={`${styles.cursorContainer} ${isHovered ? styles.hoverActive : ''}`}>
      <div ref={innerRef} className={styles.innerDot} />
      <div ref={outerRef} className={styles.outerRing} />
    </div>
  );
};

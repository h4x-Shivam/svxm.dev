'use client';
import React, { useState, useEffect } from 'react';
import Magnetic from '@/components/ui/Magnetic';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Hide on scroll down
      } else {
        setIsVisible(true);  // Show on scroll up
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav 
      className={`navbar fixed top-8 left-1/2 -translate-x-1/2 z-50 opacity-0 pointer-events-auto transition-transform duration-500 ease-out ${
        isVisible ? 'translate-y-0' : '-translate-y-[150px]'
      }`}
    >
      <div className="flex gap-8 bg-white px-10 py-3.5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.12)] font-display font-semibold text-[15px] uppercase tracking-normal">
        <Magnetic strength={15}>
          <a href="#" className="text-[var(--color-ink)] hover:opacity-50 transition-opacity block">Work</a>
        </Magnetic>
        <Magnetic strength={15}>
          <a href="#" className="text-[var(--color-ink)] hover:opacity-50 transition-opacity block">Play</a>
        </Magnetic>
        <Magnetic strength={15}>
          <a href="#" className="text-[var(--color-ink)] hover:opacity-50 transition-opacity block">About</a>
        </Magnetic>
      </div>
    </nav>
  );
}

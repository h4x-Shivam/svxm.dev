'use client';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide if scrolling down past 50px, show if scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
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
        <a href="#" className="text-[var(--color-ink)] hover:opacity-50 transition-opacity">Work</a>
        <a href="#" className="text-[var(--color-ink)] hover:opacity-50 transition-opacity">Play</a>
        <a href="#" className="text-[var(--color-ink)] hover:opacity-50 transition-opacity">About</a>
      </div>
    </nav>
  );
}

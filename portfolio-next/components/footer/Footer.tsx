'use client';

import React from 'react';

export default function Footer() {
  const scrollToTop = () => {
    // @ts-ignore
    if (window.lenis) {
      // @ts-ignore
      window.lenis.scrollTo(0, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[var(--color-ink)] text-[var(--color-paper)] pt-32 pb-10 px-[6vw] relative z-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col">
        
        {/* Massive Typographic Links */}
        <div className="flex flex-col w-full uppercase font-anton text-[14vw] md:text-[11vw] leading-[0.85] tracking-normal">
          <a 
            href="mailto:hello@svxm.dev" 
            className="hover:opacity-70 transition-opacity duration-300 w-fit"
          >
            EMAIL
          </a>
          <div className="flex flex-col md:flex-row md:gap-x-12 lg:gap-x-16">
            <a 
              href="https://instagram.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity duration-300 w-fit"
            >
              INSTAGRAM
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity duration-300 w-fit"
            >
              LINKEDIN
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-32 md:mt-48 flex items-end justify-between font-sans text-sm md:text-base opacity-80">
          <div className="flex flex-col md:flex-row gap-2 md:gap-8">
            <span>©2026 SVXM</span>
            <span>All rights reserved</span>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="group relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-[var(--color-paper)] hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)] transition-colors duration-300"
            aria-label="Scroll to top"
          >
            <svg 
              className="w-5 h-5 md:w-8 md:h-8 transform transition-transform duration-300 group-hover:-translate-y-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}

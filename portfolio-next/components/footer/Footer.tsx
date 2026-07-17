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
    <footer className="w-full relative z-20">
      
      {/* Main Black Footer */}
      <div className="w-full bg-black text-white pt-24 md:pt-32 pb-8 px-[4vw] overflow-hidden">
        <div className="max-w-[1600px] mx-auto flex flex-col">
          
          {/* Massive Typographic Links */}
          <div className="flex flex-col w-full uppercase font-anton text-[15vw] md:text-[13vw] leading-[0.85] tracking-tight">
            <a 
              href="mailto:svxm.h4x@gmail.com" 
              className="hover:opacity-70 transition-opacity duration-300 w-fit"
            >
              EMAIL
            </a>
            <div className="flex flex-col md:flex-row md:gap-x-12 lg:gap-x-16 mt-2 md:mt-0">
              <a 
                href="https://instagram.com/sh1vxxm" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity duration-300 w-fit"
              >
                INSTAGRAM
              </a>
              <a 
                href="https://www.linkedin.com/in/sh1vxxm" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity duration-300 w-fit"
              >
                LINKEDIN
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-24 md:mt-32 flex items-end justify-between font-display text-sm md:text-lg opacity-90 border-none">
            <div className="flex gap-4 md:gap-12">
              <span>©2026 SVXM</span>
            </div>
            
            <button 
              onClick={scrollToTop}
              className="group relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white hover:bg-white hover:text-black transition-colors duration-300"
              aria-label="Scroll to top"
            >
              <svg 
                className="w-6 h-6 md:w-8 md:h-8 transform transition-transform duration-300 group-hover:-translate-y-1" 
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
      </div>
    </footer>
  );
}

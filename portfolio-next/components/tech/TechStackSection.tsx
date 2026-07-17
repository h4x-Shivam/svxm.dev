'use client';

import React, { useRef, useLayoutEffect } from 'react';
import OptionWheel from '../ui/OptionWheel';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TECH_STACK = [
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'GSAP',
  'Framer Motion',
  'Node.js',
  'Python',
  'PostgreSQL',
  'Docker',
  'AWS',
  'Figma'
];

export default function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wheelRef = useRef<any>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const proxy = { progress: 0 };
      
      gsap.to(proxy, {
        progress: TECH_STACK.length - 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: "top top",
          end: `+=${TECH_STACK.length * 50}%`,
          scrub: 1.5, // Smoother scrub (more delay/easing)
          refreshPriority: 1, // Ensure this refreshes after Hero/Projects
          onUpdate: () => {
            if (wheelRef.current) {
              wheelRef.current.setTarget(proxy.progress);
            }
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[100vh] min-h-[600px] bg-[var(--color-ink)] text-[var(--color-paper)] flex flex-col md:flex-row overflow-hidden border-t border-[var(--color-paper)]/[0.05] z-30">
      
      {/* Left side: Heading */}
      <div className="w-full md:w-1/2 h-[30vh] md:h-full flex items-center justify-center md:justify-start px-[6vw] lg:pl-[10vw]">
        <h2 className="font-display font-bold text-6xl md:text-8xl lg:text-[120px] leading-none uppercase tracking-tighter opacity-90">
          TECH<br className="hidden md:block" />STACK
        </h2>
      </div>

      {/* Right side: OptionWheel */}
      <div className="w-full md:w-1/2 h-[70vh] md:h-full relative flex items-center justify-center">
        <div className="w-full h-[80%] max-h-[800px] relative pointer-events-none md:pointer-events-auto">
          {/* pointer-events disabled on mobile wrapper to let touch scroll work, but the component handles native touches inside */}
          {React.createElement(OptionWheel as any, {
            ref: wheelRef,
            items: TECH_STACK,
            defaultSelected: 0,
            textColor: "rgba(255,255,255,0.15)",
            activeColor: "#ffffff",
            side: "right",
            fontSize: 6,
            spacing: 1.8,
            curve: 1.2,
            tilt: 10,
            blur: 4,
            fade: 0.35,
            smoothing: 450,
            inset: 100,
            loop: false,
            draggable: false,
            disableWheelScroll: true
          })}
        </div>
      </div>
      
    </section>
  );
}

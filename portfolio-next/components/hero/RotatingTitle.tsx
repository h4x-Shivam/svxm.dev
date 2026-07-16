'use client';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { ANIMATION_EASING, ANIMATION_EASING_IN, ROTATION_INTERVAL, ANIMATION_DURATION } from './constants';

const TITLES = [
  "SHIVAM",
  <>FULL-STACK<br />DEVELOPER</>,
  <>FINTECH<br /><span className="ml-[2em] sm:ml-[3em] text-[var(--color-paper)]/70">BUILDER</span></>,
  "FREELANCER",
  <>IMPROVING<br />D/D</>
];

export function RotatingTitle() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const texts = gsap.utils.toArray('.rotating-text');
      const tl = gsap.timeline({ repeat: -1 });
      
      texts.forEach((text: any, i) => {
        // Animate in
        tl.fromTo(text, 
          { y: '100%', opacity: 0, filter: 'blur(10px)' },
          { y: '0%', opacity: 1, filter: 'blur(0px)', duration: ANIMATION_DURATION, ease: ANIMATION_EASING }
        )
        // Wait
        .to({}, { duration: ROTATION_INTERVAL })
        // Animate out
        .to(text, {
          y: '-100%', opacity: 0, filter: 'blur(10px)', duration: ANIMATION_DURATION * 0.8, ease: ANIMATION_EASING_IN
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col mb-10 lg:mb-12">
      <div className="text-[clamp(14px,1.2vw,16px)] font-mono text-[var(--color-paper)]/60 mb-4 lg:mb-6 uppercase tracking-[0.2em]">
        Hey, I'm
      </div>
      
      <div 
        ref={containerRef} 
        className="relative w-full overflow-hidden font-display font-bold text-[clamp(44px,7.5vw,120px)] leading-[1.05] tracking-tighter"
        style={{ height: '2.2em' }}
      >
        {TITLES.map((title, i) => (
          <h1 
            key={i} 
            className="rotating-text absolute top-0 left-0 w-full text-[var(--color-paper)] opacity-0"
          >
            {title}
          </h1>
        ))}
      </div>
    </div>
  );
}

'use client';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // A slightly lower lerp gives more "weight" to the scroll (Apple-like)
    const lenis = new Lenis({ 
      lerp: 0.075, 
      wheelMultiplier: 0.9,
      smoothWheel: true
    });
    lenisRef.current = lenis;
    
    // @ts-ignore
    window.lenis = lenis;

    // sync Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return <>{children}</>;
}

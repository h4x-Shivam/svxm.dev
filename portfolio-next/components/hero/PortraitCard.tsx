'use client';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import Image from 'next/image';
import { TILT_MAX_DEGREES, ANIMATION_EASING } from './constants';

export function PortraitCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle breathing float (idle)
      gsap.to(imageRef.current, {
        y: -8,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !imageRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    gsap.to(imageRef.current, {
      rotationY: x * (TILT_MAX_DEGREES * 2),
      rotationX: -y * (TILT_MAX_DEGREES * 2),
      x: x * 10, // Slight parallax
      y: y * 10, // Slight parallax
      ease: ANIMATION_EASING,
      duration: 0.6
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, {
      rotationY: 0,
      rotationX: 0,
      x: 0,
      y: 0,
      ease: ANIMATION_EASING,
      duration: 1
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[450px] aspect-[4/5] mx-auto perspective-[1200px] z-20 group"
    >
      <div 
        ref={imageRef}
        className="w-full h-full relative rounded-[32px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)] transform-gpu will-change-transform bg-[#111] border border-white/5"
      >
        <Image 
          src="/project/WhatsApp Image 2026-06-21 at 23.44.39.jpeg"
          alt="Shivam Portrait"
          fill
          className="object-cover contrast-[1.05]"
          priority
        />
        {/* Subtle vignette overlay for premium depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none mix-blend-multiply"></div>
        {/* Soft inner ring */}
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[32px] pointer-events-none"></div>
      </div>
    </div>
  );
}

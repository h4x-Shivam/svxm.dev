'use client';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import Image from 'next/image';

const TITLES = [
  "Software Engineer.",
  "AI Builder.",
  "Problem Solver.",
  "Always Curious."
];

function RotatingTitle() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      const texts = gsap.utils.toArray('.rotating-text');
      const tl = gsap.timeline({ repeat: -1 });
      
      texts.forEach((text: any, i) => {
        // Animate in
        tl.fromTo(text, 
          { y: 40, opacity: 0, rotateX: -90, filter: 'blur(10px)' },
          { y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)', duration: 1.2, ease: "power4.out" }
        )
        // Wait
        .to({}, { duration: 1.5 })
        // Animate out
        .to(text, {
          y: -40, opacity: 0, rotateX: 90, filter: 'blur(10px)', duration: 1, ease: "power4.in"
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-[clamp(40px,6vw,80px)] overflow-visible perspective-[1000px] mb-8">
      {TITLES.map((title, i) => (
        <div key={i} className="rotating-text absolute top-0 left-0 text-[var(--color-paper)] font-display font-bold text-[clamp(32px,5vw,72px)] leading-none tracking-tight origin-center opacity-0">
          {title}
        </div>
      ))}
    </div>
  );
}

function Portrait() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle breathing float
      gsap.to(imageRef.current, {
        y: -15,
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
    const x = (e.clientX - left) / width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - top) / height - 0.5;

    gsap.to(imageRef.current, {
      rotationY: x * 4, // max 2 degrees tilt each way
      rotationX: -y * 4,
      ease: "power2.out",
      duration: 0.6
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, {
      rotationY: 0,
      rotationX: 0,
      ease: "power2.out",
      duration: 1
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[450px] aspect-[4/5] mx-auto perspective-[1000px] z-20 group"
    >
      <div 
        ref={imageRef}
        className="w-full h-full relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu will-change-transform bg-white/5"
      >
        <Image 
          src="/project/WhatsApp Image 2026-06-21 at 23.44.39.jpeg"
          alt="Shivam Portrait"
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          priority
        />
        {/* Subtle noise/vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-transparent to-transparent pointer-events-none mix-blend-multiply"></div>
      </div>
    </div>
  );
}

export default function HeroContent() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center pt-32 pb-12 px-[4vw]">
      <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
        {/* Left Column */}
        <div className="flex flex-col z-20 lg:col-span-7">
          <h1 className="font-display font-medium text-[clamp(40px,7vw,100px)] leading-none tracking-tighter mb-4 text-[var(--color-paper)]">
            Hi, I'm Shivam.
          </h1>
          <RotatingTitle />
          <p className="font-mono text-[clamp(16px,1.5vw,22px)] leading-relaxed text-[var(--color-paper)]/70 max-w-[600px] mb-12">
            Building thoughtful digital experiences where intelligent engineering meets clean design.
          </p>
          
          <div className="flex flex-wrap items-center gap-6">
            <button className="px-10 py-5 rounded-full bg-[var(--color-paper)] text-[var(--color-ink)] font-display uppercase tracking-widest text-sm font-bold transition-transform hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              View My Work
            </button>
            <button className="px-10 py-5 rounded-full border border-[var(--color-paper)]/20 text-[var(--color-paper)] font-display uppercase tracking-widest text-sm font-bold transition-all hover:border-[var(--color-paper)] hover:bg-[var(--color-paper)]/10">
              Let's Connect
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex justify-center items-center lg:col-span-5">
          <Portrait />
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { MotionTokens } from '@/lib/animations/MotionTokens';
import { SRS } from '@/lib/animations/SVXMRevealSystem';
import Lanyard from '@/components/ui/lanyard';
import { PORTRAIT_B64 } from './idCardImage';

const PARAGRAPH_TEXT = "I'm a developer who enjoys building thoughtful software at the intersection of AI, finance and engineering. I'm fascinated by systems that solve real problems, obsessed with refining user experiences, and constantly experimenting with new technologies. Every project I build teaches me something new—and that's what keeps me building.";

const FRONT_CARD_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900" style="background-color:%23111111; color:white; font-family:sans-serif;"><defs><linearGradient id="grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="rgba(0,0,0,0.7)" /><stop offset="20%" stop-color="rgba(0,0,0,0)" /><stop offset="60%" stop-color="rgba(0,0,0,0)" /><stop offset="100%" stop-color="rgba(0,0,0,0.95)" /></linearGradient></defs><image x="0" y="0" width="600" height="900" preserveAspectRatio="xMidYMid slice" href="data:image/jpeg;base64,${PORTRAIT_B64}" /><rect x="0" y="0" width="600" height="900" fill="url(%23grad)" /><text x="50" y="80" font-size="24" fill="white" font-weight="bold" letter-spacing="4">SVXM</text><text x="50" y="780" font-size="48" fill="white" font-weight="bold">Shivam Jaiswal</text><text x="50" y="820" font-size="24" fill="lightgray">Software Engineer</text><text x="50" y="860" font-size="20" fill="gray">INDIA</text></svg>`;
const BACK_CARD_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900" style="background-color:%23111111; color:white; font-family:sans-serif;"><rect width="600" height="900" fill="%23111111"/><text x="300" y="100" font-size="30" fill="gray" text-anchor="middle" letter-spacing="4">CONNECT</text><rect x="150" y="200" width="300" height="300" fill="white"/><text x="300" y="360" font-size="24" fill="black" text-anchor="middle">[ QR CODE ]</text><text x="300" y="600" font-size="24" fill="white" text-anchor="middle">github.com/h4x-Shivam</text><text x="300" y="650" font-size="24" fill="white" text-anchor="middle">linkedin.com/in/sh1vxxm</text><text x="300" y="700" font-size="24" fill="white" text-anchor="middle">svxm.h4x@gmail.com</text><text x="300" y="820" font-size="16" fill="gray" text-anchor="middle">Portfolio Version: 1.0.0</text></svg>`;

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const paragraphWrapRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const lanyardContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Prepare DOM
      if (paragraphRef.current && !paragraphRef.current.innerHTML.includes('srs-word')) {
        paragraphRef.current.innerHTML = SRS.splitToWords(PARAGRAPH_TEXT);
      }

      const words = paragraphRef.current ? gsap.utils.toArray(paragraphRef.current.querySelectorAll('.srs-word')) : [];
      // 2. Initial Hidden States (Empty Canvas)
      gsap.set(words, { opacity: 0 }); 
      gsap.set(headerRef.current, { opacity: 0, y: 30 });
      
      // Ensure paragraph starts perfectly centered visually
      gsap.set(paragraphWrapRef.current, { 
        xPercent: -50, 
        yPercent: -50, 
        left: '50%', 
        top: '50%',
        scale: 1 
      });
      
      gsap.set(lanyardContainerRef.current, { 
        y: "-120%", 
        opacity: 0,
        pointerEvents: 'none',
        rotation: -5
      });

      // 3. Master Cinematic Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top', 
          end: '+=4500', 
          pin: true,
          scrub: 1, 
          invalidateOnRefresh: true,
        }
      });

      // Stage 1: Paragraph Reveal (Reading Phase)
      tl.to(words, {
        opacity: 1,
        stagger: 0.05,
        duration: 3,
        ease: 'power1.inOut'
      });

      // Stage 2: Breathing Pause
      tl.to({}, { duration: 0.3 }); 
      
      // Stage 3: Paragraph Transform (Camera Reveal)
      tl.to(paragraphWrapRef.current, {
        left: '4vw',
        top: '35vh',
        xPercent: 0,
        yPercent: 0,
        scale: 0.6,
        duration: 1.2,
        ease: MotionTokens.ease.smooth
      });

      // Stage 4: Heading Reveal
      const headingDuration = 1.5;
      tl.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: headingDuration,
        ease: MotionTokens.ease.default
      });

      // Stage 5: Lanyard Composition
      // Exact overlap at 50% of the heading animation (relative to the end of the previous sequence)
      const compositionStart = `-=${headingDuration * 0.5}`;

      tl.to(lanyardContainerRef.current, {
        y: "0%",
        opacity: 1,
        rotation: 0,
        duration: 2.5,
        ease: "power2.out", // Natural drop, avoids UI bounce
        onComplete: () => {
          if (lanyardContainerRef.current) {
            lanyardContainerRef.current.style.pointerEvents = 'auto';
          }
        },
        onReverseComplete: () => {
          if (lanyardContainerRef.current) {
            lanyardContainerRef.current.style.pointerEvents = 'none';
          }
        }
      }, compositionStart);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen bg-[var(--color-ink)] text-[var(--color-paper)] overflow-hidden z-10"
    >
      <div className="w-full h-full relative max-w-[1600px] mx-auto">
        
        {/* Layer 1: Reading / Composition Layer (Paragraph) */}
        {/* Starts absolutely centered, driven entirely by GSAP */}
        <div 
          ref={paragraphWrapRef} 
          className="absolute z-10 w-[90vw] max-w-[900px] origin-top-left transform-gpu will-change-transform"
        >
          <p 
            ref={paragraphRef}
            className="font-sans font-medium text-[clamp(28px,3vw,48px)] leading-[1.3] tracking-tight text-center md:text-left [&_.srs-word]:opacity-0"
          />
        </div>

        {/* Layer 2: Heading Layer */}
        <div 
          ref={headerRef} 
          className="absolute top-[15vh] left-[4vw] z-20 flex flex-col opacity-0 translate-y-[30px]"
        >

          <h2 className="font-display font-bold text-[clamp(60px,9vw,160px)] leading-none uppercase tracking-tighter">
            Behind SVXM
          </h2>
        </div>

        {/* Layer 4: Lanyard Layer */}
        <div 
          ref={lanyardContainerRef} 
          className="absolute top-0 right-0 w-full md:w-1/2 h-full z-30 pointer-events-none transform-gpu will-change-transform flex items-center justify-center opacity-0 -translate-y-[150%]"
        >
          <Lanyard 
            position={[0, 0, 20]} 
            gravity={[0, -20, 0]} 
            frontImage={FRONT_CARD_SVG}
            backImage={BACK_CARD_SVG}
            lanyardImage="/project/ChatGPT Image Jul 17, 2026, 12_50_53 PM.png"
          />
        </div>

      </div>
    </section>
  );
}

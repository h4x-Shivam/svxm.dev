import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { MotionTokens } from '@/lib/animations/MotionTokens';
import { SRS } from '@/lib/animations/SVXMRevealSystem';
import Lanyard from '@/components/ui/lanyard';

const PARAGRAPH_TEXT = "I'm a developer who enjoys building thoughtful software at the intersection of AI, finance and engineering. I'm fascinated by systems that solve real problems, obsessed with refining user experiences, and constantly experimenting with new technologies. Every project I build teaches me something new—and that's what keeps me building.";
const MINDSET_WORDS = ["THINK", "BUILD", "LEARN", "REPEAT"];

// We encode a simple ID card as SVG data URIs
const FRONT_CARD_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900" style="background-color:%23111111; color:white; font-family:sans-serif;"><rect width="600" height="900" fill="%23111111"/><text x="50" y="80" font-size="24" fill="gray" font-weight="bold" letter-spacing="4">SVXM</text><text x="50" y="700" font-size="48" fill="white" font-weight="bold">Shivam Jaiswal</text><text x="50" y="740" font-size="24" fill="gray">Software Engineer</text><text x="50" y="820" font-size="20" fill="gray">INDIA</text></svg>`;
const BACK_CARD_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900" style="background-color:%23111111; color:white; font-family:sans-serif;"><rect width="600" height="900" fill="%23111111"/><text x="300" y="100" font-size="30" fill="gray" text-anchor="middle" letter-spacing="4">CONNECT</text><rect x="150" y="200" width="300" height="300" fill="white"/><text x="300" y="360" font-size="24" fill="black" text-anchor="middle">[ QR CODE ]</text><text x="300" y="600" font-size="24" fill="white" text-anchor="middle">github.com/h4x-Shivam</text><text x="300" y="650" font-size="24" fill="white" text-anchor="middle">linkedin.com/in/shivam-jaiswal</text><text x="300" y="800" font-size="16" fill="gray" text-anchor="middle">Portfolio Version: 1.0.0</text></svg>`;

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const lanyardContainerRef = useRef<HTMLDivElement>(null);
  const mindsetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create SRS words
      if (paragraphRef.current) {
        paragraphRef.current.innerHTML = SRS.splitToWords(PARAGRAPH_TEXT);
      }

      const words = paragraphRef.current?.querySelectorAll('.srs-word');
      const mindsetWords = mindsetRef.current?.querySelectorAll('.mindset-word');
      
      // Initialize layout states
      gsap.set(words, { opacity: 0.1 });
      gsap.set(mindsetWords, { opacity: 0, y: 30 });
      gsap.set(lanyardContainerRef.current, { 
        filter: 'blur(20px) grayscale(100%)', 
        opacity: 0.2 
      });

      // We do NOT pin the section. We use standard scrolling as requested!
      // "Do NOT pin this section. Allow natural scrolling."
      // We will map the entire viewport intersection to a timeline.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%', // Start when section enters 30% into view
          end: 'bottom 50%', // End when section is halfway out
          scrub: 1, // Smooth scrub
        }
      });

      // 1. Reveal paragraph and un-blur card simultaneously
      tl.to(words, {
        opacity: 1,
        stagger: 0.02,
        duration: 1,
        ease: 'none'
      }, 0);

      tl.to(lanyardContainerRef.current, {
        filter: 'blur(0px) grayscale(0%)',
        opacity: 1,
        duration: 1,
        ease: 'none'
      }, 0);

      // 2. Small pause
      tl.to({}, { duration: 0.2 });

      // 3. Scale down paragraph and move to upper left
      tl.to(paragraphRef.current, {
        scale: 0.6,
        xPercent: -20,
        yPercent: -20,
        transformOrigin: "left top",
        duration: 0.5,
        ease: MotionTokens.ease.smooth
      });

      // 4. Fade in Mindset words
      tl.to(mindsetWords, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: MotionTokens.ease.default
      }, "-=0.2");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[var(--color-ink)] text-[var(--color-paper)] py-32 px-[4vw] z-10 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="mb-24 flex items-end justify-between border-b border-[var(--color-paper)]/10 pb-10">
          <h2 className="font-display font-bold text-[clamp(40px,8vw,120px)] leading-none uppercase tracking-tighter">
            Behind SVXM
          </h2>
          <p className="font-mono text-sm uppercase tracking-widest hidden md:block mb-4">
            The Person Behind The Code
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left Column: Story & Mindset */}
          <div className="flex flex-col h-full justify-center relative">
            <p 
              ref={paragraphRef}
              className="font-display text-[clamp(24px,2.5vw,40px)] leading-[1.3] tracking-tight max-w-[800px] will-change-transform"
            />
            
            <div ref={mindsetRef} className="absolute bottom-0 left-0 flex flex-col gap-2 mt-12">
              {MINDSET_WORDS.map((word, i) => (
                <span key={i} className="mindset-word font-anton text-[clamp(40px,5vw,80px)] leading-[0.85] uppercase tracking-wide opacity-0">
                  {word}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Lanyard */}
          <div className="relative w-full h-[600px] flex items-center justify-center">
            <div ref={lanyardContainerRef} className="w-full h-full absolute inset-0 will-change-filter pointer-events-auto">
              <Lanyard 
                position={[0, 0, 20]} 
                gravity={[0, -20, 0]} 
                frontImage={FRONT_CARD_SVG}
                backImage={BACK_CARD_SVG}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

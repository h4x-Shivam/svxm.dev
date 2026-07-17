'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FloatingCard } from './FloatingCard';
import { MOTION } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

const PROJECT = {
  category: 'FEATURED WORK',
  title: 'SwingsterV2',
  description: 'AI-powered stock pattern intelligence platform.',
  image: '/project/Screenshot 2026-07-15 204735.png', // Main
  dashboardImg: '/project/Screenshot 2026-07-15 204735.png', // Placeholder 1
  aiImg: '/project/Screenshot 2026-07-15 211205.png', // Placeholder 2
};

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // GSAP Cinematic Scroll Reveal
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%", // Stage 1: Breathing space before triggering
          end: "top 10%", // Defines the scroll distance over which the animation plays
          scrub: 1.5, // Silkier smoothing to link animation directly to scroll progress
          refreshPriority: 5, // Medium priority, calculates after Hero but before TechStack
        }
      });

      // Stage 2: Reveal Label
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: MOTION.ease.standard }
      );

      // Stage 3: Mask Reveal Title
      tl.fromTo(
        titleRef.current,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.8, ease: MOTION.ease.standard },
        "-=0.2"
      );

      // Stage 4: Reveal Subtitle
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: MOTION.reveal.textY },
        { opacity: 1, y: 0, duration: MOTION.duration.normal, ease: MOTION.ease.standard },
        "-=0.4"
      );

      // Stage 5: Reveal Main Preview
      tl.fromTo(
        previewRef.current,
        { opacity: 0, y: MOTION.reveal.imageY, scale: MOTION.reveal.imageScale },
        { opacity: 1, y: 0, scale: 1, duration: MOTION.duration.slow, ease: MOTION.ease.reveal },
        "-=0.2"
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Framer Motion Parallax (Max 2 degrees)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["2deg", "-2deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-2deg", "2deg"]);
  const cardTranslateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-15px", "15px"]);
  const cardTranslateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-15px", "15px"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!previewRef.current) return;
    const rect = previewRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Hover animations for RSQUARE effect
  const containerVariants = {
    initial: {},
    hover: {
      transition: {
        staggerChildren: MOTION.stagger.normal,
        delayChildren: MOTION.stagger.normal,
      },
    },
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.96, y: 10 },
    hover: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full min-h-screen bg-[var(--color-ink)] text-[var(--color-paper)] py-40 px-[6vw] z-10 flex flex-col items-center overflow-hidden perspective-distant"
    >
      
      {/* Editorial Header */}
      <div className="flex flex-col items-center text-center mb-32 z-10">
        {/* Stage 2 */}
        <span ref={labelRef} className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] opacity-40 mb-6 block">
          {PROJECT.category}
        </span>
        
        {/* Stage 3: Mask Reveal */}
        <div className="overflow-hidden pb-2 mb-8">
          <h2 ref={titleRef} className="font-display font-bold text-5xl md:text-7xl lg:text-[100px] leading-none uppercase tracking-tighter block">
            {PROJECT.title}
          </h2>
        </div>
        
        {/* Stage 4 */}
        <p ref={subtitleRef} className="font-sans text-[15px] md:text-[18px] opacity-60 leading-relaxed max-w-xl block">
          {PROJECT.description}
        </p>
      </div>

      {/* Main Interactive Container */}
      <div className="relative w-full max-w-[1200px] mx-auto flex items-center justify-center">
        
        {/* Stage 5: Main Preview */}
        <div ref={previewRef} className="w-full flex justify-center">
          <motion.div
            variants={containerVariants}
            initial="initial"
            whileHover="hover"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full max-w-[800px] aspect-[4/3] lg:aspect-[16/10] rounded-[24px] lg:rounded-[32px] cursor-pointer group z-10"
          >
            {/* Main Preview Image */}
            <motion.div 
              className="absolute inset-0 w-full h-full rounded-[inherit] overflow-hidden border border-[var(--color-paper)]/[0.04] shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-shadow duration-[800ms] group-hover:shadow-[0_32px_80px_rgba(0,0,0,0.5)] group-hover:border-[var(--color-paper)]/[0.1]"
              variants={{
                initial: { scale: 1 },
                hover: { scale: 1.02, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
              }}
            >
              <Image 
                src={PROJECT.image} 
                alt={PROJECT.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/5 pointer-events-none" />
            </motion.div>

            {/* Floating Card 1: Top Left (Like RSQUARE 'LIKE' icon) */}
            <FloatingCard 
              variants={cardVariants}
              style={{ x: cardTranslateX, y: cardTranslateY }}
              className="hidden md:flex flex-col justify-center p-8 w-[300px] h-[160px] absolute -left-[5%] top-[-10%] z-20"
            >
              <h4 className="font-mono text-[10px] uppercase tracking-widest opacity-40 mb-3">Project Overview</h4>
              <p className="font-sans text-[13px] leading-relaxed opacity-80">
                {PROJECT.title} detects institutional-grade patterns with AI.
              </p>
            </FloatingCard>

            {/* Floating Card 2: Right side (Like RSQUARE book) */}
            <FloatingCard 
              variants={cardVariants}
              style={{ x: cardTranslateX, y: cardTranslateY }}
              className="hidden md:block w-[360px] aspect-[4/3] absolute -right-[20%] top-[20%] z-20 p-2"
            >
              <div className="relative w-full h-full rounded-[12px] overflow-hidden border border-white/5">
                <Image src={PROJECT.dashboardImg} alt="Dashboard" fill sizes="360px" className="object-cover" />
              </div>
            </FloatingCard>

            {/* Floating Card 3: Bottom Left (Like RSQUARE palette) */}
            <FloatingCard 
              variants={cardVariants}
              style={{ x: cardTranslateX, y: cardTranslateY }}
              className="hidden md:block w-[240px] aspect-square absolute left-[2%] -bottom-[15%] z-30 p-2"
            >
               <div className="relative w-full h-full rounded-[12px] overflow-hidden border border-white/5 bg-[#111]">
                <Image src={PROJECT.aiImg} alt="AI Engine" fill sizes="240px" className="object-cover opacity-50 mix-blend-luminosity" />
              </div>
            </FloatingCard>
            
          </motion.div>
        </div>

      </div>

      {/* Mobile Stacked Content (Graceful Degradation) */}
      <div className="md:hidden mt-12 flex flex-col gap-6 w-full max-w-[90vw]">
        <div className="p-6 rounded-2xl bg-[var(--color-paper)]/[0.03] border border-[var(--color-paper)]/[0.08]">
          <h4 className="font-mono text-[10px] uppercase tracking-widest opacity-40 mb-3">Project Overview</h4>
          <p className="font-sans text-[14px] leading-relaxed opacity-80">
            {PROJECT.title} is an AI-powered platform that helps traders discover institutional-grade opportunities through intelligent pattern detection.
          </p>
        </div>
        
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--color-paper)]/[0.08]">
          <Image src={PROJECT.dashboardImg} alt="Dashboard" fill sizes="90vw" className="object-cover" />
        </div>

        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[var(--color-paper)]/[0.08]">
          <Image src={PROJECT.aiImg} alt="AI Engine" fill sizes="90vw" className="object-cover" />
        </div>
      </div>

    </section>
  );
}

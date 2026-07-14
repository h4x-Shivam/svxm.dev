'use client';
import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import * as opentype from 'opentype.js';
import { interpolate } from 'flubber';

const SLIDES = [
  { label: 'VerdictX', color: '#111111' },
  { label: 'SwingsterV2', color: '#3a3a3a' },
  { label: 'Content Brand', color: '#5a5a5a' },
  { label: 'Case Study', color: '#7a2020' },
];

export default function HeroSection({ onMorphComplete }: { onMorphComplete: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    fetch('/fonts/Anton-Regular.ttf')
      .then(res => res.arrayBuffer())
      .then(buffer => {
        if (!active) return;
        try {
          const font = opentype.parse(buffer);
          
          const fontSize = 100;
          function getWordPaths(word: string) {
            const paths = [];
            let currentX = 0;
            for (let i = 0; i < word.length; i++) {
              const char = word[i];
              const glyph = font.charToGlyph(char);
              const path = glyph.getPath(currentX, 0, fontSize);
              paths.push(path.toPathData(2));
              currentX += (glyph.advanceWidth * fontSize) / font.unitsPerEm;
            }
            return paths;
          }

          // @ts-ignore
          window.__TARGET_PATHS = [
            ...getWordPaths("SHI"),
            ...getWordPaths("VAM")
          ];
          
          setIsFontLoaded(true);
        } catch (err) {
          console.error('Font could not be parsed: ', err);
          onMorphComplete();
        }
      })
      .catch(err => {
        console.error('Font could not be fetched: ', err);
        onMorphComplete();
      });

    return () => { active = false; };
  }, [onMorphComplete]);

  useLayoutEffect(() => {
    if (!isFontLoaded) return;

    // @ts-ignore
    const allTargetPaths = window.__TARGET_PATHS as string[];

    const ctx = gsap.context(() => {
      // 1. Entrance Morph Animation
      const morphTl = gsap.timeline({
        onComplete: () => {
          onMorphComplete();
        }
      });

      for (let i = 1; i <= 6; i++) {
        const stick = document.querySelector('.char-' + i) as SVGPathElement;
        if (!stick) continue;
        const startPath = stick.getAttribute('d')!;
        const endPath = allTargetPaths[i - 1];
        
        const interpolator = interpolate(startPath, endPath, { maxSegmentLength: 2 });
        
        const dummy = { progress: 0 };
        morphTl.to(dummy, {
          progress: 1,
          duration: 2.2, // Increased from 1.4 for a slower, grander entrance
          ease: "elastic.out(1, 0.5)", // Slightly softer elastic bounce
          onUpdate: function() {
            stick.setAttribute('d', interpolator(this.targets()[0].progress));
          }
        }, (i - 1) * 0.15); // Increased stagger from 0.1 to 0.15
      }

      // 2. The pinned scroll animation (ScrollTrigger)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=6000', // Increased from 4000 to require more scrolling (slowing down the timeline)
          scrub: 1.5, // Increased from 1 to 1.5 for a silkier smooth catch-up
          pin: true,
          invalidateOnRefresh: true 
        },
      });
      // Step 2: Open Gap & Show First Slide
      const gapSize = () => window.innerHeight * 0.55;
      tl.to("#scrollInd", { opacity: 0, duration: 0.05 }, 0);
      tl.to("#mediaGap", { width: gapSize, ease: "power2.inOut", duration: 0.2 }, 0);
      tl.to(".slide-0", { y: '0%', opacity: 1, ease: "power2.out", duration: 0.2 }, 0);

      const slideDuration = 0.25;
      let startTime = 0.2;

      for (let i = 1; i < SLIDES.length; i++) {
        // Bring in the new slide from the bottom
        tl.to(`.slide-${i}`, { y: '0%', opacity: 1, ease: "power2.out", duration: slideDuration }, startTime);
        
        // Push back all previous slides
        for (let j = 0; j < i; j++) {
          const depth = i - j; 
          const scale = 1 - (depth * 0.05); // 0.95, 0.90, etc.
          const yOffset = -depth * 25; // Move up by 25px per level
          const rot = depth * 12; // Rotate container by 12deg per level
          
          tl.to(`.slide-${j}`, { scale: scale, y: yOffset, rotation: rot, ease: "power2.out", duration: slideDuration }, startTime);
          tl.to(`.slide-${j} .inner-content`, { rotation: -rot, ease: "power2.out", duration: slideDuration }, startTime);
        }
        
        startTime += slideDuration;
      }

      // Step 3: Close media gap and hide all slides
      tl.to(".slide-item", { opacity: 0, y: '-20%', duration: 0.15, ease: "power2.inOut" }, startTime);
      tl.to("#mediaGap", { width: 0, ease: "power2.inOut", duration: 0.2 }, startTime + 0.05);
      startTime += 0.25;

      // Step 4: Expand final gap, scale down texts, move them up, show intro & nav
      const getFinalGapWidth = () => {
        const leftW = document.getElementById('heroTextLeft')?.offsetWidth || 0;
        const rightW = document.getElementById('heroTextRight')?.offsetWidth || 0;
        const padding = window.innerWidth * 0.08; // 4vw on each side = 8vw total
        return window.innerWidth - leftW - rightW - padding;
      };

      const getTargetY = () => {
        return 52 - window.innerHeight / 2;
      };

      tl.to("#finalGap", {width: getFinalGapWidth, ease: "power2.inOut", duration: 0.15}, startTime)
        .to("#heroTextLeft", {scale: 0.22, ease: "power2.inOut", duration: 0.15}, startTime)
        .to("#heroTextRight", {scale: 0.22, ease: "power2.inOut", duration: 0.15}, startTime)
        .to("#nameWrap", {y: getTargetY, ease: "power2.inOut", duration: 0.15}, startTime)
        
        // Crossfade
        .to(".text-original", {opacity: 0, ease: "power2.inOut", duration: 0.15}, startTime)
        .to(".text-replacement", {opacity: 1, ease: "power2.inOut", duration: 0.15}, startTime)
        
        .to("#introLines", {opacity: 1, y: 0, ease: "power2.out", duration: 0.1}, startTime + 0.05)
        .to(document.querySelector('.navbar'), {opacity: 1, pointerEvents: "auto", ease: "power2.out", duration: 0.1}, startTime + 0.05);

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [isFontLoaded, onMorphComplete]);

  return (
    <section id="heroPin" ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden z-10">
      <div id="nameWrap" className="absolute top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center transform-gpu">
        <div id="heroTextLeft" className="flex font-display uppercase tracking-tighter leading-none origin-left relative" style={{ fontSize: 'clamp(100px, 24vw, 500px)'}}>
          <div className="text-original flex items-center">
            <svg id="svg-left" viewBox="0 -100 130 120" className="h-[1em] w-auto overflow-visible block fill-current">
              <path className="char-1" d="M 0,-100 L 25,-100 L 25,0 L 0,0 Z" />
              <path className="char-2" d="M 50,-100 L 75,-100 L 75,0 L 50,0 Z" />
              <path className="char-3" d="M 100,-100 L 125,-100 L 125,0 L 100,0 Z" />
            </svg>
          </div>
          <div className="text-replacement absolute top-0 left-0 opacity-0 whitespace-nowrap lowercase text-[var(--color-ink)] font-anton">svxm</div>
        </div>

        <div id="mediaGap" className="relative w-0 h-[55vh] overflow-visible shrink-0 flex items-center justify-center">
          {SLIDES.map((s, i) => (
            <div
              key={i}
              className={`slide-item slide-${i} absolute w-full h-full rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.3)] will-change-transform`}
              style={{ 
                zIndex: i,
                transform: 'translateY(100%)',
                opacity: 0
              }}
            >
              <div className="inner-content w-full h-full flex items-center justify-center scale-125 origin-center will-change-transform" style={{ background: s.color }}>
                <div className="font-display tracking-tight text-3xl text-[var(--color-paper)]">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div id="finalGap" className="w-0 shrink-0"></div>

        <div id="heroTextRight" className="flex font-display uppercase tracking-tighter leading-none origin-right relative" style={{ fontSize: 'clamp(100px, 24vw, 500px)'}}>
          <div className="text-original flex items-center">
            <svg id="svg-right" viewBox="0 -100 170 120" className="h-[1em] w-auto overflow-visible block fill-current">
              <path className="char-4" d="M 0,-100 L 25,-100 L 25,0 L 0,0 Z" />
              <path className="char-5" d="M 70,-100 L 95,-100 L 95,0 L 70,0 Z" />
              <path className="char-6" d="M 140,-100 L 165,-100 L 165,0 L 140,0 Z" />
            </svg>
          </div>
          <div className="text-replacement absolute top-0 right-0 opacity-0 whitespace-nowrap lowercase text-[var(--color-ink)] font-anton">dev</div>
        </div>
      </div>

      <div id="introLines" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] opacity-0 text-center w-[90%] max-w-[900px] z-10 pointer-events-none">
        <h1 className="font-display font-medium text-[clamp(28px,4vw,56px)] mb-4 tracking-tight">Hi, I am Shivam!</h1>
        <h2 className="font-mono font-normal text-[clamp(20px,3vw,42px)] leading-[1.3] tracking-tight text-[var(--color-ink)]/80">Full-stack creative partner.<br/>Design and code, held to the same standard.</h2>
      </div>

      <div id="scrollInd" className="absolute bottom-[40px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 font-display text-[11px] font-bold uppercase tracking-[2px] opacity-100 z-10 transition-opacity duration-300">
        <div className="w-[1px] h-[24px] bg-[var(--color-ink)]/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[var(--color-ink)] animate-[scrollDown_1.5s_cubic-bezier(0.65,0,0.35,1)_infinite]"></div>
        </div>
        <span>Scroll</span>
      </div>
    </section>
  );
}

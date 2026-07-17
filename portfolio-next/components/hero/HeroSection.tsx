'use client';
import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import * as opentype from 'opentype.js';
import { interpolate, combine } from 'flubber';
import Image from 'next/image';
import HeroContent from './HeroContent';
import ShinyText from '@/components/ui/ShinyText';

const SLIDES = [
  { label: 'VerdictX', color: '#111111', src: '/project/Screenshot 2026-07-15 211205.png' },
  { label: 'SwingsterV2', color: '#3a3a3a', src: '/project/Screenshot 2026-07-15 204735.png' },
  { label: 'Content Brand', color: '#5a5a5a', src: '/project/funny_ memes.jpg' },
  { label: 'Case Study', color: '#7a2020', src: '/project/download.jpg' },
];

export default function HeroSection({ onMorphComplete }: { onMorphComplete: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    fetch('/fonts/AtomicAge-Regular.ttf')
      .then(res => res.arrayBuffer())
      .then(buffer => {
        if (!active) return;
        try {
          const font = opentype.parse(buffer);
          
          // Calculate dynamic structural primitives for each letter based on its bounding box
          const createStructuralBlocks = (x: number, y: number, w: number, h: number) => {
            // We create 4 generic geometric blocks that roughly fill the bounding box.
            // These act as the "scaffolding" that the letter is built from.
            const b1 = `M ${x},${y} L ${x+w},${y} L ${x+w},${y+h*0.2} L ${x},${y+h*0.2} Z`; // Top bar
            const b2 = `M ${x},${y+h*0.4} L ${x+w*0.8},${y+h*0.4} L ${x+w*0.8},${y+h*0.6} L ${x},${y+h*0.6} Z`; // Middle bar
            const b3 = `M ${x+w*0.2},${y+h*0.8} L ${x+w},${y+h*0.8} L ${x+w},${y+h} L ${x+w*0.2},${y+h} Z`; // Bottom bar
            const b4 = `M ${x+w*0.4},${y+h*0.2} L ${x+w*0.6},${y+h*0.2} L ${x+w*0.6},${y+h*0.8} L ${x+w*0.4},${y+h*0.8} Z`; // Vertical spine
            return [b1, b2, b3, b4];
          };
          
          const createAbstractDots = (x: number, y: number, w: number, h: number) => {
             // Scattered tiny geometric primitives that start far apart
             const d1 = `M ${x-50},${y-50} L ${x-40},${y-50} L ${x-40},${y-40} L ${x-50},${y-40} Z`;
             const d2 = `M ${x+w+50},${y-20} L ${x+w+60},${y-20} L ${x+w+60},${y-10} L ${x+w+50},${y-10} Z`;
             const d3 = `M ${x-20},${y+h+50} L ${x-10},${y+h+50} L ${x-10},${y+h+60} L ${x-20},${y+h+60} Z`;
             const d4 = `M ${x+w+30},${y+h+30} L ${x+w+40},${y+h+30} L ${x+w+40},${y+h+40} L ${x+w+30},${y+h+40} Z`;
             return [d1, d2, d3, d4];
          };

          const processWord = (word: string) => {
            const fontSize = 100;
            const letters = [];
            let currentX = 0;
            for (let i = 0; i < word.length; i++) {
              const char = word[i];
              const glyph = font.charToGlyph(char);
              const path = glyph.getPath(currentX, 0, fontSize);
              
              const bounds = glyph.getBoundingBox();
              const w = ((bounds.x2 - bounds.x1) * fontSize) / font.unitsPerEm;
              const h = ((bounds.y2 - bounds.y1) * fontSize) / font.unitsPerEm;
              const yOffset = -((bounds.y2) * fontSize) / font.unitsPerEm; // Invert y because SVG y goes down
              
              // Fallback width if space
              const actualW = w || fontSize * 0.3;
              const actualH = h || fontSize * 0.7;
              
              letters.push({
                char,
                finalPath: path.toPathData(2),
                structuralBlocks: createStructuralBlocks(currentX, yOffset, actualW, actualH),
                abstractDots: createAbstractDots(currentX, yOffset, actualW, actualH)
              });
              
              const advance = glyph.advanceWidth || 0;
              currentX += (advance * fontSize) / font.unitsPerEm;
            }
            return { letters, width: currentX };
          };

          const leftData = processWord("SHI");
          const rightData = processWord("VAM");

          // @ts-ignore
          window.__TARGET_DATA = [...leftData.letters, ...rightData.letters];
          // @ts-ignore
          window.__TARGET_WIDTHS = [leftData.width, rightData.width];
          
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
    const allTargetData = window.__TARGET_DATA as any[];
    // @ts-ignore
    const targetWidths = window.__TARGET_WIDTHS as number[];

    const leftSvg = document.getElementById('svg-left');
    const rightSvg = document.getElementById('svg-right');
    
    if (leftSvg && targetWidths) {
      leftSvg.setAttribute('viewBox', `0 -100 ${targetWidths[0]} 120`);
    }
    if (rightSvg && targetWidths) {
      rightSvg.setAttribute('viewBox', `0 -100 ${targetWidths[1]} 120`);
    }

    const ctx = gsap.context(() => {
      // 1. Entrance Morph Animation
      const morphTl = gsap.timeline({
        onComplete: () => {
          // Hide pieces and show combined paths
          document.querySelectorAll('.char-pieces').forEach(el => (el as HTMLElement).style.display = 'none');
          document.querySelectorAll('.char-combined').forEach(el => (el as HTMLElement).style.display = 'block');
          onMorphComplete();
        }
      });

      // We animate each letter staggered
      for (let i = 0; i < 6; i++) {
        const letterData = allTargetData[i];
        if (!letterData) continue;
        
        const piecesGroup = document.querySelector(`.char-pieces-${i}`);
        const combinedPath = document.querySelector(`.char-combined-${i}`) as SVGPathElement;
        if (!piecesGroup || !combinedPath) continue;

        const letterTl = gsap.timeline();

        // Stage 1: Abstract scattered dots stretch & slide into structural scaffolding blocks
        for (let p = 0; p < 4; p++) {
           const piecePath = document.querySelector(`.char-${i}-piece-${p}`) as SVGPathElement;
           if (!piecePath) continue;
           
           // Initialize with abstract dots
           piecePath.setAttribute('d', letterData.abstractDots[p]);
           
           try {
             // Animate dot -> structural block
             const assembleInterpolator = interpolate(letterData.abstractDots[p], letterData.structuralBlocks[p], { maxSegmentLength: 2 });
             const assembleDummy = { progress: 0 };
             
             // Random stagger offset for a more organic, puzzle-like appearance
             const randomDelay = p * 0.1 + Math.random() * 0.3;
             
             letterTl.to(piecePath, {
               opacity: 1,
               duration: 0.8,
               ease: "power2.out"
             }, randomDelay);
             
             letterTl.to(assembleDummy, {
               progress: 1,
               duration: 1.2,
               ease: "expo.out",
               onUpdate: function() {
                 piecePath.setAttribute('d', assembleInterpolator(this.targets()[0].progress));
               }
             }, randomDelay); 
           } catch(e) {
             piecePath.setAttribute('d', letterData.structuralBlocks[p]);
           }
        }
        
        // Stage 2: Scaffolding blocks morph perfectly into the final opentype path
        try {
          const finalInterpolator = combine(letterData.structuralBlocks, letterData.finalPath, { maxSegmentLength: 2, single: true }) as any;
          const finalDummy = { progress: 0 };
          
          letterTl.to(finalDummy, {
            progress: 1,
            duration: 1.5,
            ease: "power2.inOut",
            onStart: () => {
              // Swap visibility exactly when final morph begins
              (piecesGroup as HTMLElement).style.display = 'none';
              combinedPath.style.display = 'block';
              // Init combinedPath with the exact same visual structural blocks so swap is invisible
              combinedPath.setAttribute('d', letterData.structuralBlocks.join(' '));
            },
            onUpdate: function() {
              combinedPath.setAttribute('d', finalInterpolator(this.targets()[0].progress));
            }
          }, "-=0.2"); // Overlap the morph with the end of the assemble
        } catch (e) {
          console.error("Combine failed for", i, e);
          combinedPath.setAttribute('d', letterData.finalPath);
        }
        
        // Stagger each whole letter
        morphTl.add(letterTl, i * 0.25);
      }

      // 2. The pinned scroll animation (ScrollTrigger)
      const tl = gsap.timeline({ paused: true });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=6000', // Scroll length
        pin: true,
        refreshPriority: 10, // HIGHEST priority - must calculate spacer before elements below it
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Manually scrub the timeline to decouple it from ScrollTrigger's revert lifecycle
          gsap.to(tl, { progress: self.progress, duration: 1.5, ease: "power3.out", overwrite: "auto" });
        },
        onRefresh: () => {
          tl.invalidate();
        },
        onLeave: (self) => {
          // Force timeline to finish instantly and kill any pending scrub tweens
          gsap.killTweensOf(tl);
          tl.progress(1);
          
          // Natively kill the trigger and completely remove the pin spacer + transforms!
          self.kill(true); 

          // Snap to top instantly so they start at the "new route" flawlessly
          // @ts-ignore
          if (window.lenis) {
            // @ts-ignore
            window.lenis.scrollTo(0, { immediate: true });
          } else {
            window.scrollTo(0, 0); 
          }

          // CRITICAL: Refresh all triggers now that the 6000px spacer is gone!
          // This ensures ProjectsSection and TechStackSection recalculate their heights
          // correctly based on the normal DOM flow.
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 50);
        }
      });

      // Step 2: Open Gap & Show First Slide
      const gapSize = () => 500; // Fixed width for the 500px cards
      tl.to("#scrollInd", { opacity: 0, duration: 0.05 }, 0);
      tl.to("#mediaGap", { width: gapSize, ease: "power2.inOut", duration: 0.2 }, 0);
      tl.to(".slide-0", { y: '0%', opacity: 1, ease: "power2.out", duration: 0.2 }, 0);

      const slideDuration = 0.25;
      let startTime = 0.2;

      for (let i = 1; i < SLIDES.length; i++) {
        // Bring in the new slide from the bottom
        tl.to(`.slide-${i}`, { y: '0%', opacity: 1, ease: "power2.out", duration: slideDuration }, startTime);
        
        // Push back all previous slides (Sticky Stack Effect)
        for (let j = 0; j < i; j++) {
          const depth = i - j; 
          // Match snippet's scale math roughly: 1 - depth * 0.05
          const scale = Math.max(0.5, 1 - depth * 0.05);
          // Translate up to compensate for scale and create a stack visual
          const yOffset = -depth * 30; 
          
          tl.to(`.slide-${j}`, { scale: scale, y: yOffset, rotation: 0, ease: "power2.out", duration: slideDuration }, startTime);
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
        const padding = window.innerWidth * 0.08; 
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
        
        // Invert background to dark
        .to(sectionRef.current, { backgroundColor: "var(--color-ink)", ease: "power2.inOut", duration: 0.15 }, startTime)
        
        .to("#heroContentWrapper", {opacity: 1, pointerEvents: "auto", ease: "power2.out", duration: 0.1}, startTime + 0.05)
        .to(document.querySelector('.navbar') || [], {opacity: 1, pointerEvents: "auto", ease: "power2.out", duration: 0.1}, startTime + 0.05);

    }, sectionRef);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFontLoaded]);

  return (
    <section id="heroPin" ref={sectionRef} className="relative h-screen flex items-center justify-center overflow-hidden z-10">
      <div id="nameWrap" className="absolute top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center transform-gpu">
        <div id="heroTextLeft" className="flex font-display uppercase tracking-tighter leading-none origin-left relative" style={{ fontSize: 'clamp(100px, 24vw, 500px)'}}>
          <div className="text-original flex items-center">
            <svg id="svg-left" viewBox="0 -100 130 120" className="h-[1em] w-auto overflow-visible block fill-current">
              {[0, 1, 2].map(i => (
                <g key={i}>
                  <g className={`char-pieces char-pieces-${i}`}>
                    <path className={`char-${i}-piece-0`} style={{ opacity: 0 }} />
                    <path className={`char-${i}-piece-1`} style={{ opacity: 0 }} />
                    <path className={`char-${i}-piece-2`} style={{ opacity: 0 }} />
                    <path className={`char-${i}-piece-3`} style={{ opacity: 0 }} />
                  </g>
                  <path className={`char-combined char-combined-${i}`} style={{ display: 'none' }} />
                </g>
              ))}
            </svg>
          </div>
          <div className="text-replacement absolute top-0 left-0 -translate-x-[40px] opacity-0 whitespace-nowrap lowercase font-anton">
            <ShinyText text="svxm" speed={3} delay={0.5} color="var(--color-paper)" shineColor="#ffffff" spread={100} />
          </div>
        </div>

        <div id="mediaGap" className="relative w-0 h-[400px] overflow-visible shrink-0 flex items-center justify-center">
          {SLIDES.map((s, i) => (
            <div
              key={i}
              className={`slide-item slide-${i} absolute w-full max-w-[500px] h-[300px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] will-change-transform transform-gpu origin-top`}
              style={{ 
                zIndex: i,
                transform: 'translateY(150%)', // Start below the gap
                opacity: 0
              }}
            >
              <div className="inner-content w-full h-full relative flex flex-col items-center justify-center" style={{ background: s.color }}>
                {s.src && (
                  <Image src={s.src} alt={s.label} fill sizes="(max-width: 500px) 100vw, 500px" className="object-cover" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div id="finalGap" className="w-0 shrink-0"></div>

        <div id="heroTextRight" className="flex font-display uppercase tracking-tighter leading-none origin-right relative" style={{ fontSize: 'clamp(100px, 24vw, 500px)'}}>
          <div className="text-original flex items-center">
            <svg id="svg-right" viewBox="0 -100 170 120" className="h-[1em] w-auto overflow-visible block fill-current">
              {[3, 4, 5].map(i => (
                <g key={i}>
                  <g className={`char-pieces char-pieces-${i}`}>
                    <path className={`char-${i}-piece-0`} style={{ opacity: 0 }} />
                    <path className={`char-${i}-piece-1`} style={{ opacity: 0 }} />
                    <path className={`char-${i}-piece-2`} style={{ opacity: 0 }} />
                    <path className={`char-${i}-piece-3`} style={{ opacity: 0 }} />
                  </g>
                  <path className={`char-combined char-combined-${i}`} style={{ display: 'none' }} />
                </g>
              ))}
            </svg>
          </div>
          <div className="text-replacement absolute top-0 right-0 opacity-0 whitespace-nowrap lowercase font-anton">
            <ShinyText text="dev" speed={3} delay={0.5} color="var(--color-paper)" shineColor="#ffffff" spread={100} />
          </div>
        </div>
      </div>

      <div id="heroContentWrapper" className="absolute top-0 left-0 w-[100vw] h-[100vh] opacity-0 z-10 pointer-events-none">
        <HeroContent />
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

import { gsap, ScrollTrigger } from '@/lib/gsap';
import { MotionTokens } from './MotionTokens';
import React from 'react';

/**
 * SVXM Reveal System (SRS)
 * A standardized way to reveal text inside sections.
 */
export const SRS = {
  /**
   * Initializes a word-by-word scroll reveal on a container of words.
   * Words must be pre-split into elements with the class 'srs-word'.
   *
   * @param containerRef React ref pointing to the text container
   * @param triggerRef React ref pointing to the scroll trigger element (usually the section)
   */
  initWordReveal: (containerRef: React.RefObject<HTMLElement | null>, triggerRef: React.RefObject<HTMLElement | null>) => {
    if (!containerRef.current || !triggerRef.current) return null;

    const words = containerRef.current.querySelectorAll('.srs-word');
    if (words.length === 0) return null;

    // Set initial state
    gsap.set(words, { opacity: 0.1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top 60%',
        end: 'top 10%',
        scrub: 1.5, // Smooth scrubbing
      }
    });

    // Reveal word by word
    tl.to(words, {
      opacity: 1,
      stagger: 0.05,
      ease: 'none',
    });

    return tl;
  },
  
  /**
   * Splits a plain text string into an array of span elements with the 'srs-word' class.
   * This is a utility to avoid using SplitText plugin.
   */
  splitToWords: (text: string) => {
    return text.split(' ').map((word, i) => (
      `<span class="srs-word inline-block mr-[0.25em]">${word}</span>`
    )).join('');
  },
};

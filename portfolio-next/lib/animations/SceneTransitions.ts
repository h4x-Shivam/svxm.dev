import { gsap } from '../gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * SVXM Transition System (STS)
 * This file is the single source of truth for all scene-to-scene cinematic transitions.
 * It strictly handles atmospheric interpolation (colors, themes, global CSS vars)
 * rather than individual component animations.
 */

export const SceneTransitions = {
  /**
   * Hero -> Featured Project Transition
   * Interpolates the global theme from White (Bright Design Studio)
   * to Dark (Premium Product Showcase) during the final 30% of the Hero's scroll.
   * 
   * @param heroRef - The ref of the HeroSection (used to map the scroll trigger bounds)
   */
  initHeroToFeaturedTransition: (heroRef: React.RefObject<HTMLElement | null>) => {
    if (!heroRef.current) return;

    // We create a dedicated ScrollTrigger that perfectly overlays the Hero's 6000px scroll space,
    // but we only animate the color transition during the final 25-30%.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: '+=6000',
        scrub: true,
        // High priority to calculate its position correctly alongside the Hero
        refreshPriority: 10,
      }
    });

    // Dummy tween for the first 70% of the scroll. 
    // The theme stays pure white while the Hero animations play out.
    tl.to({}, { duration: 0.7 });

    tl.fromTo(document.body, 
      {
        '--background': '#FFFFFF',
        '--foreground': '#111111',
        '--border': 'rgba(17, 17, 17, 0.1)',
        '--muted': 'rgba(17, 17, 17, 0.6)',
        '--card': '#FFFFFF',
      },
      {
        keyframes: {
          '--background': ['#FFFFFF', '#F5F5F5', '#D9D9D9', '#8C8C8C', '#2B2B2B', '#111111'],
        },
        '--foreground': '#FFFFFF',       // Paper White
        '--border': 'rgba(255, 255, 255, 0.1)', // Subtle white borders
        '--muted': 'rgba(255, 255, 255, 0.6)',
        '--card': '#1a1a1a',
        duration: 0.3,
        ease: 'none', // Linear interpolation tied strictly to scroll progress
      }
    );

    return tl;
  }
};
